using QuoteManagement.Application.DTOs;

namespace QuoteManagement.Application.Interfaces
{
    public interface IAuthorService
    {
        Task<IEnumerable<AuthorDto>> GetAllAuthorsAsync();
        Task<AuthorDto> GetAuthorByIdAsync(Guid id);
        Task<IEnumerable<AuthorDto>> SearchAuthorsAsync(string searchTerm);
        Task<AuthorDto> CreateAuthorAsync(string name);
        Task<AuthorDto> UpdateAuthorAsync(Guid id, string name);
        Task DeleteAuthorAsync(Guid id);
    }
}