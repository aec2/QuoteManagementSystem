using QuoteManagement.Application.DTOs;

namespace QuoteManagement.Application.Interfaces
{
    public interface IShareService
    {
        Task<ShareableLinkDto> CreateShareableLinkAsync(Guid quoteId, DateTime? expiryDate = null);
        Task<QuoteDto> GetQuoteByShortCodeAsync(string shortCode);
        Task<ShareableLinkDto> GetShareableLinkAsync(string shortCode);
        Task IncrementViewCountAsync(string shortCode);
    }
}