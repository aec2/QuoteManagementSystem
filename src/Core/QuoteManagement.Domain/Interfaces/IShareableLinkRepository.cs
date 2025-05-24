using QuoteManagement.Domain.Entities;

namespace QuoteManagement.Domain.Interfaces
{
    public interface IShareableLinkRepository : IRepository<ShareableLink>
    {
        Task<ShareableLink> GetByShortCodeAsync(string shortCode);
    }
}