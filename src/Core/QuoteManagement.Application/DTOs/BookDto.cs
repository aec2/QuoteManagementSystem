namespace QuoteManagement.Application.DTOs
{
    public class BookDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string ISBN { get; set; }
        public int QuoteCount { get; set; }
    }
}