using Microsoft.EntityFrameworkCore;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Interfaces;
using QuoteManagement.Persistence.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace QuoteManagement.Persistence.Repositories
{
    public class ShareableLinkRepository : Repository<ShareableLink>, IShareableLinkRepository
    {
        public ShareableLinkRepository(QuoteManagementDbContext context) : base(context)
        {
        }

        public async Task<ShareableLink> GetByShortCodeAsync(string shortCode)
        {
            return await _dbSet.FirstOrDefaultAsync(l => l.ShortCode == shortCode);
        }
    }
}