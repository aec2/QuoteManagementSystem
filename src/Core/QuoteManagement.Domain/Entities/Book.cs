using QuoteManagement.Domain.Common;
using QuoteManagement.Domain.ValueObjects;

namespace QuoteManagement.Domain.Entities
{
    public class Book : BaseEntity
    {
        public string Title { get; private set; }
        public ISBN ISBN { get; private set; }
        public string CoverImageUrl { get; private set; }
        
        // Navigation property
        public virtual ICollection<Quote> Quotes { get; private set; }
        
        protected Book() { } // For EF
        
        public Book(string title, string isbn = null, string coverImageUrl = null)
        {
            SetTitle(title);
            ISBN = !string.IsNullOrWhiteSpace(isbn) ? new ISBN(isbn) : null;
            CoverImageUrl = coverImageUrl;
            Quotes = new HashSet<Quote>();
        }
        
        private void SetTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Book title cannot be empty.");
            
            Title = title;
        }

        public void UpdateTitle(string title)
        {
            SetTitle(title);
        }

        public void UpdateISBN(string isbn)
        {
            ISBN = !string.IsNullOrWhiteSpace(isbn) ? new ISBN(isbn) : null;
        }

        public void UpdateCoverImage(string coverImageUrl)
        {
            CoverImageUrl = coverImageUrl;
        }
    }
}