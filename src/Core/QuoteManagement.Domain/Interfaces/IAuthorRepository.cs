using QuoteManagement.Domain.Entities;

namespace QuoteManagement.Domain.Interfaces
{
    public interface IAuthorRepository : IRepository<Author>
    {
        Task<Author> GetByNameAsync(string name);
        Task<IEnumerable<Author>> SearchByNameAsync(string searchTerm);
    }
}