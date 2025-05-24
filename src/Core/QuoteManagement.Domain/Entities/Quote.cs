using QuoteManagement.Domain.Common;
using QuoteManagement.Domain.ValueObjects; // Added
using QuoteManagement.Domain.Exceptions; // Added

namespace QuoteManagement.Domain.Entities
{
    public class Quote : BaseEntity, IAuditableEntity
    {
        public string Text { get; private set; }
        public Guid AuthorId { get; private set; }
        public Guid BookId { get; private set; }
        public PageNumber PageNumber { get; private set; }
        public DateTime DateAdded { get; private set; }
        public DateTime? DateModified { get; private set; }
        
        // Navigation properties
        public virtual Author Author { get; private set; }
        public virtual Book Book { get; private set; }
        
        protected Quote() { } // For EF
        
        public Quote(string text, Guid authorId, Guid bookId, int? pageNumber = null)
        {
            SetText(text);
            AuthorId = authorId;
            BookId = bookId;
            if (pageNumber.HasValue)
            {
                PageNumber = new PageNumber(pageNumber.Value);
            }
            DateAdded = DateTime.UtcNow;
        }
        
        public void UpdateText(string text)
        {
            SetText(text);
            DateModified = DateTime.UtcNow;
        }
        
        private void SetText(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                throw new InvalidQuoteException("Quote text cannot be empty.");
            
            Text = text;
        }

        public void UpdatePageNumber(int pageNumber)
        {
            PageNumber = new PageNumber(pageNumber);
            DateModified = DateTime.UtcNow;
        }

        public void RemovePageNumber()
        {
            PageNumber = null;
            DateModified = DateTime.UtcNow;
        }
    }
}