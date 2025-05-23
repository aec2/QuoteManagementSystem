using AutoMapper;
using QuoteManagement.Application.Common.Exceptions;
using QuoteManagement.Application.DTOs;
using QuoteManagement.Application.Interfaces;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Interfaces;

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

        public async Task<IEnumerable<QuoteDto>> GetAllQuotesAsync()
        {
            var quotes = await _quoteRepository.GetQuotesWithDetailsAsync();
            return _mapper.Map<IEnumerable<QuoteDto>>(quotes);
        }

        public async Task<QuoteDto> GetQuoteByIdAsync(Guid id)
        {
            var quote = await _quoteRepository.GetByIdAsync(id);
            if (quote == null)
                throw new NotFoundException(nameof(Quote), id);

            return _mapper.Map<QuoteDto>(quote);
        }

        public async Task<IEnumerable<QuoteDto>> SearchQuotesAsync(string searchTerm)
        {
            var quotes = await _quoteRepository.SearchAsync(searchTerm);
            return _mapper.Map<IEnumerable<QuoteDto>>(quotes);
        }

        public async Task<IEnumerable<QuoteDto>> FilterQuotesByAuthorAsync(Guid authorId)
        {
            var quotes = await _quoteRepository.GetByAuthorIdAsync(authorId);
            return _mapper.Map<IEnumerable<QuoteDto>>(quotes);
        }

        public async Task<IEnumerable<QuoteDto>> FilterQuotesByBookAsync(Guid bookId)
        {
            var quotes = await _quoteRepository.GetByBookIdAsync(bookId);
            return _mapper.Map<IEnumerable<QuoteDto>>(quotes);
        }

        public async Task<QuoteDto> CreateQuoteAsync(CreateQuoteDto createQuoteDto)
        {
            // Handle Author
            Author author;
            if (createQuoteDto.AuthorId.HasValue)
            {
                author = await _authorRepository.GetByIdAsync(createQuoteDto.AuthorId.Value);
                if (author == null)
                    throw new NotFoundException(nameof(Author), createQuoteDto.AuthorId.Value);
            }
            else
            {
                author = await _authorRepository.GetByNameAsync(createQuoteDto.AuthorName);
                if (author == null)
                {
                    author = new Author(createQuoteDto.AuthorName);
                    await _authorRepository.AddAsync(author);
                }
            }

            // Handle Book
            Book book;
            if (createQuoteDto.BookId.HasValue)
            {
                book = await _bookRepository.GetByIdAsync(createQuoteDto.BookId.Value);
                if (book == null)
                    throw new NotFoundException(nameof(Book), createQuoteDto.BookId.Value);
            }
            else
            {
                book = await _bookRepository.GetByTitleAsync(createQuoteDto.BookTitle);
                if (book == null)
                {
                    book = new Book(createQuoteDto.BookTitle, createQuoteDto.ISBN);
                    await _bookRepository.AddAsync(book);
                }
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

    }
}