namespace QuoteManagement.Application.Services
{
    public class QuoteService : IQuoteService
    {
        private readonly IQuoteRepository _quoteRepository;
        private readonly IAuthorRepository _authorRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public QuoteService(
            IQuoteRepository quoteRepository,
            IAuthorRepository authorRepository,
            IBookRepository bookRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _quoteRepository = quoteRepository;
            _authorRepository = authorRepository;
            _bookRepository = bookRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public async Task<QuoteDto> CreateQuoteAsync(CreateQuoteDto createQuoteDto)
        {
            // Validate author and book exist
            var author = await _authorRepository.GetByIdAsync(createQuoteDto.AuthorId);
            if (author == null)
            {
                // Create new author if needed
                author = new Author(createQuoteDto.AuthorName);
                await _authorRepository.AddAsync(author);
            }
            
            var book = await _bookRepository.GetByIdAsync(createQuoteDto.BookId);
            if (book == null)
            {
                // Create new book if needed
                book = new Book(createQuoteDto.BookTitle, createQuoteDto.ISBN);
                await _bookRepository.AddAsync(book);
            }
            
            var quote = new Quote(
                createQuoteDto.Text,
                author.Id,
                book.Id,
                createQuoteDto.PageNumber);
            
            await _quoteRepository.AddAsync(quote);
            await _unitOfWork.CommitAsync();
            
            return _mapper.Map<QuoteDto>(quote);
        }
        
        // Implement other methods...
    }
}