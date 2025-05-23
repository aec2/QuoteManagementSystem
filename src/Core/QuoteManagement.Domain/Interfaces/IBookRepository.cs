using QuoteManagement.Domain.Entities;

namespace QuoteManagement.Domain.Interfaces
{
    public interface IBookRepository : IRepository<Book>
    {
        Task<Book> GetByTitleAsync(string title);
        Task<Book> GetByISBNAsync(string isbn);
        Task<IEnumerable<Book>> SearchByTitleAsync(string searchTerm);
    }
}