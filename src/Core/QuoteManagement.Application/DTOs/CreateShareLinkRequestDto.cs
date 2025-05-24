
    // DTO for creating a shareable link
    public class CreateShareLinkRequestDto
    {
        public Guid QuoteId { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }