using QuoteManagement.Application.DTOs;

namespace QuoteManagement.Application.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllBooksAsync();
        Task<BookDto> GetBookByIdAsync(Guid id);
        Task<IEnumerable<BookDto>> SearchBooksAsync(string searchTerm);
        Task<BookDto> CreateBookAsync(string title, string isbn = "");
        Task<BookDto> UpdateBookAsync(Guid id, string title, string isbn = "");
        Task DeleteBookAsync(Guid id);
    }
}