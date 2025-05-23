namespace QuoteManagement.Application.DTOs
{
    public class ShareableLinkDto
    {
        public Guid Id { get; set; }
        public Guid QuoteId { get; set; }
        public string ShortCode { get; set; }
        public string FullUrl { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int ViewCount { get; set; }
    }
}