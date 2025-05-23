using QuoteManagement.Domain.Entities;

namespace QuoteManagement.Domain.Interfaces
{
    public interface IQuoteRepository : IRepository<Quote>
    {
        Task<IEnumerable<Quote>> SearchAsync(string searchTerm);
        Task<IEnumerable<Quote>> GetByAuthorIdAsync(Guid authorId);
        Task<IEnumerable<Quote>> GetByBookIdAsync(Guid bookId);
        Task<IEnumerable<Quote>> GetQuotesWithDetailsAsync();
    }
}