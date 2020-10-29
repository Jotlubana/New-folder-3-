
$(document).ready(function () {
    BookList();
});

// first of all create a book structure to send and receive data
var Book = {
    id: 0,
    title: "",
    rating: "",
    published: ""
}


// In Case of Success: show all the books
function BookListSuccess(Books) {
    // Iterate over the collection of data
    $("#BookTable tbody").remove();
    $.each(Books, function (index, book) {
        // Add a row to the Book table
        AddRow(book);
    });
}

// Add a row to the book table
function AddRow(book) {
    // check if a <tbody> tag exists
    if ($("#BookTable tbody").length == 0) {
        // add one if not
        $("#BookTable").append("<tbody></tbody>");
    }

    // Append row
    $("#BookTable tbody").append(
        ConstructTableBody(book));
}

// construct Table body
function ConstructTableBody(book) {
    var newRow = "<tr>" +
        "<td>" + book.id + "</td>" +
        "<td><input   class='title form-control' type='text' value='" + book.title + "'/></td>" +
        "<td><input  class='rating form-control'  type='text' value='" + book.rating + "'/></td>" +
        "<td><input  class='published form-control' type='date' value='" + book.published + "'/></td>" +
        "<td>" +
        "<button type='button' " +
        "onclick='BookUpdate(this);' " +
        "class='btn btn-outline-warning' " +
        "data-id='" + book.id + "' " +
        "data-title='" + book.title + "' " +
        "data-rating='" + book.rating + "' " +
        "data-published='" + book.published + "' " +
        ">" +
        "<span class='glyphicon glyphicon-edit' /> Update" +
        "</button> " +
        " <button type='button' " +
        "onclick='BookDelete(this);'" +
        "class='btn btn-outline-danger' " +
        "data-id='" + book.id + "'>" +
        "<span class='glyphicon glyphicon-remove' />Delete" +
        "</button>" +
        "</td>" +
        "</tr>";

    return newRow;
}

function AddBook(item) {
    var options = {};
    options.url = "/api/Books";
    options.type = "POST";
    var bk = Book;
    bk.title = $("#title").val();
    bk.rating = $("#rating").val();
    bk.published = $('#published').val();
    options.contentType = "application/json";
    options.dataType = "html";
    options.data = JSON.stringify(bk);
    options.success = function (msg) {
        BookList();
        $("#msg").html(msg);
    },
        options.error = function () {
            $("#msg").html("WebApi Calling Error");
        };
    $.ajax(options);
}

// to update book using api
function BookUpdate(item) {
    var id = $(item).data("id");
    var options = {};
    options.url = "/api/Books/" + id
    options.type = "PUT";

    var bk = Book;
    bk.id = $(item).data("id");
    bk.title = $(".title", $(item).parent().parent()).val();
    bk.rating = $(".rating", $(item).parent().parent()).val();
    bk.published = $(".published", $(item).parent().parent()).val();
    options.contentType = "application/json";
    options.dataType = "html";
    options.data = JSON.stringify(bk);
    options.success = function (msg) {
        $("#msg").html(msg);
    };
    options.error = function () {
        $("#msg").html("Err: Web API!");
    };
    $.ajax(options);
}

// to delete book using api
function BookDelete(item) {
    var id = $(item).data("id");
    var options = {};
    options.url = "/api/Books/"
        + id;
    options.type = "DELETE";
    options.dataType = "html";
    options.success = function (msg) {
        console.log('msg= ' + msg);
        $("#msg").html(msg);
        BookList();
    };
    options.error = function () {
        $("#msg").html("Error calling the Web API");
    };
    $.ajax(options);
}




// This function is creeated to get the list of
// all the books from web api
function BookList() {
    // Call Web API to get a list of Books
    $.ajax({
        url: '/api/Books/',
        type: 'GET',
        dataType: 'json',
        success: function (Books) {
            BookListSuccess(Books);
        },
        error: function (request, message, error) {
            InCaseOfError(request, message, error);
        }
    });
}
// On error this function should be called
function InCaseOfError(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" + request.responseJSON.Message + "\n";
    }

    alert(msg);
}

