using Microsoft.EntityFrameworkCore;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Interfaces;
using QuoteManagement.Persistence.Context;

namespace QuoteManagement.Persistence.Repositories
{
    public class BookRepository : Repository<Book>, IBookRepository
    {
        public BookRepository(QuoteManagementDbContext context) : base(context)
        {
        }

        public async Task<Book> GetByISBNAsync(string isbn)
        {
            // ISBN is a ValueObject, so comparison needs to be handled carefully.
            // Assuming ISBN.Value is the string representation.
            return await _dbSet.FirstOrDefaultAsync(b => b.ISBN.Value == isbn);
        }

        public async Task<Book> GetByTitleAsync(string title)
        {
            return await _dbSet.FirstOrDefaultAsync(b => b.Title == title);
        }

        public async Task<IEnumerable<Book>> SearchByTitleAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return await GetAllAsync();

            return await _dbSet.Where(b => b.Title.Contains(searchTerm)).ToListAsync();
        }
        
        public override async Task<Book> GetByIdAsync(Guid id)
        {
            return await _dbSet.Include(b => b.Quotes).FirstOrDefaultAsync(b => b.Id == id);
        }

        public override async Task<IEnumerable<Book>> GetAllAsync()
        {
            return await _dbSet.Include(b => b.Quotes).ToListAsync();
        }
    }
}