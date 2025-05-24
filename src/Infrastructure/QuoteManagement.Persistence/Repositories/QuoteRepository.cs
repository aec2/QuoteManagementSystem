using Microsoft.EntityFrameworkCore;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Interfaces;
using QuoteManagement.Persistence.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuoteManagement.Persistence.Repositories
{
    public class QuoteRepository : Repository<Quote>, IQuoteRepository
    {
        public QuoteRepository(QuoteManagementDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Quote>> GetByAuthorIdAsync(Guid authorId)
        {
            return await _dbSet
                .Include(q => q.Author)
                .Include(q => q.Book)
                .Where(q => q.AuthorId == authorId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Quote>> GetByBookIdAsync(Guid bookId)
        {
            return await _dbSet
                .Include(q => q.Author)
                .Include(q => q.Book)
                .Where(q => q.BookId == bookId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Quote>> SearchAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return await GetQuotesWithDetailsAsync();

            return await _dbSet
                .Include(q => q.Author)
                .Include(q => q.Book)
                .Where(q => q.Text.Contains(searchTerm) ||
                            q.Author.Name.Contains(searchTerm) ||
                            q.Book.Title.Contains(searchTerm))
                .ToListAsync();
        }

        public async Task<IEnumerable<Quote>> GetQuotesWithDetailsAsync()
        {
            return await _dbSet
                .Include(q => q.Author)
                .Include(q => q.Book)
                .ToListAsync();
        }

        // Override GetByIdAsync to include Author and Book for individual quote retrieval
        public override async Task<Quote> GetByIdAsync(Guid id)
        {
            return await _dbSet
                .Include(q => q.Author)
                .Include(q => q.Book)
                .FirstOrDefaultAsync(q => q.Id == id);
        }
    }
}