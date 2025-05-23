using QuoteManagement.Domain.Common;

namespace QuoteManagement.Domain.Entities
{
    public class Author : BaseEntity
    {
        public string Name { get; private set; }
        
        // Navigation property
        public virtual ICollection<Quote> Quotes { get; private set; }
        
        protected Author() { } // For EF
        
        public Author(string name)
        {
            SetName(name);
            Quotes = new HashSet<Quote>();
        }
        
        public void UpdateName(string name)
        {
            SetName(name);
        }
        
        private void SetName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Author name cannot be empty.");
            
            Name = name;
        }
    }
}