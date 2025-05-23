namespace QuoteManagement.Application.DTOs
{
    public class QuoteDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; }
        public Guid BookId { get; set; }
        public string BookTitle { get; set; }
        public int? PageNumber { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? DateModified { get; set; }
    }
}