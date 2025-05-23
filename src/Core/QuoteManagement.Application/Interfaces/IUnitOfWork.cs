namespace QuoteManagement.Application.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        Task<int> CommitAsync();
        Task RollbackAsync();
    }
}