namespace QuoteManagement.Application.DTOs
{
    public class AuthorDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int QuoteCount { get; set; }
    }
}