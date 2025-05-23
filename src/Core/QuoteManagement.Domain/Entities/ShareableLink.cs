using QuoteManagement.Domain.Common;

namespace QuoteManagement.Domain.Entities
{
    public class ShareableLink : BaseEntity
    {
        public Guid QuoteId { get; private set; }
        public string ShortCode { get; private set; }
        public DateTime CreatedDate { get; private set; }
        public DateTime? ExpiryDate { get; private set; }
        public int ViewCount { get; private set; }

        // Navigation property
        public virtual Quote Quote { get; private set; }

        protected ShareableLink() { } // For EF

        public ShareableLink(Guid quoteId, string shortCode, DateTime? expiryDate = null)
        {
            QuoteId = quoteId;
            SetShortCode(shortCode);
            CreatedDate = DateTime.UtcNow;
            ExpiryDate = expiryDate;
            ViewCount = 0;
        }

        public void IncrementViewCount()
        {
            ViewCount++;
        }

        public bool IsExpired()
        {
            return ExpiryDate.HasValue && DateTime.UtcNow > ExpiryDate.Value;
        }

        private void SetShortCode(string shortCode)
        {
            if (string.IsNullOrWhiteSpace(shortCode))
                throw new ArgumentException("Short code cannot be empty.", nameof(shortCode));

            ShortCode = shortCode;
        }
    }
}