using QuoteManagement.Application.DTOs;

namespace QuoteManagement.Application.Interfaces
{
    public interface IQuoteService
    {
        Task<IEnumerable<QuoteDto>> GetAllQuotesAsync();
        Task<QuoteDto> GetQuoteByIdAsync(Guid id);
        Task<IEnumerable<QuoteDto>> SearchQuotesAsync(string searchTerm);
        Task<IEnumerable<QuoteDto>> FilterQuotesByAuthorAsync(Guid authorId);
        Task<IEnumerable<QuoteDto>> FilterQuotesByBookAsync(Guid bookId);
        Task<QuoteDto> CreateQuoteAsync(CreateQuoteDto createQuoteDto);
        Task<QuoteDto> UpdateQuoteAsync(Guid id, UpdateQuoteDto updateQuoteDto);
        Task DeleteQuoteAsync(Guid id);
    }
}