using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BooksWebAPI.Models
{
    public class Book // Book Table
    {
    // unique key for book
        [Key]
        public int ID { get; set; }
        // book title printed on front page
        public string Title { get; set; }
        // isbn rating
        public int Rating { get; set; }
        // published date of book
        public string Published { get; set; } 
    }
}
