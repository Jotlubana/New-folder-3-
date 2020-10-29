using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BooksWebAPI.Models
{
    public class BooksWebAPIContext : DbContext
    {
        public BooksWebAPIContext (DbContextOptions<BooksWebAPIContext> options)
            : base(options)
        {
        }

        public DbSet<BooksWebAPI.Models.Book> Book { get; set; }
    }
}
