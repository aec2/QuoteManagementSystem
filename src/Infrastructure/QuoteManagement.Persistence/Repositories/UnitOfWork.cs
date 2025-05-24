// Ensure the correct namespace for IUnitOfWork; update if necessary
using QuoteManagement.Application.Interfaces;
using QuoteManagement.Persistence.Context; 
using System.Threading.Tasks;

namespace QuoteManagement.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly QuoteManagementDbContext _context;

        public UnitOfWork(QuoteManagementDbContext context)
        {
            _context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public Task RollbackAsync()
        {
            // EF Core automatically handles rollback on exceptions during SaveChanges.
            // If you have explicit transaction management (e.g., _context.Database.BeginTransaction()),
            // you would roll it back here. For simple SaveChanges, this might not do much.
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _context.Dispose();
            System.GC.SuppressFinalize(this); // Standard dispose pattern
        }
    }
}