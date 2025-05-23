namespace QuoteManagement.Application.DTOs
{
    public class CreateQuoteDto
    {
        public string Text { get; set; }
        public Guid? AuthorId { get; set; }
        public string AuthorName { get; set; }
        public Guid? BookId { get; set; }
        public string BookTitle { get; set; }
        public string ISBN { get; set; }
        public int? PageNumber { get; set; }
    }
}