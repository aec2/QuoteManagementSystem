namespace QuoteManagement.Domain.Common
{
    public interface IAuditableEntity
    {
        DateTime DateAdded { get; }
        DateTime? DateModified { get; }
    }
}