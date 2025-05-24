using AutoMapper;
using QuoteManagement.Application.Common.Exceptions;
using QuoteManagement.Application.DTOs;
using QuoteManagement.Application.Interfaces;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Interfaces;
using QuoteManagement.Domain.ValueObjects; // Added for PageNumber

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

            // Ensure related entities are loaded if GetByIdAsync doesn't include them
            // For example, if Author and Book names are needed for the DTO
            if (quote.Author == null) // Assuming Author property exists and might not be loaded
            {
                // This is a simplified way; ideally, GetByIdAsync would handle includes
                var detailedQuote = await _quoteRepository.GetQuotesWithDetailsAsync();
                quote = detailedQuote.FirstOrDefault(q => q.Id == id);
                 if (quote == null)
                    throw new NotFoundException(nameof(Quote), id);
            }


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
            
            // Fetch the quote with details to populate AuthorName and BookTitle for the DTO
            var createdQuoteWithDetails = await _quoteRepository.GetByIdAsync(quote.Id); // Assuming GetByIdAsync can populate these, or use GetQuotesWithDetailsAsync
             if (createdQuoteWithDetails == null) throw new NotFoundException(nameof(Quote), quote.Id);


            return _mapper.Map<QuoteDto>(createdQuoteWithDetails);
        }

        public async Task<QuoteDto> UpdateQuoteAsync(Guid id, UpdateQuoteDto updateQuoteDto)
        {
            var quote = await _quoteRepository.GetByIdAsync(id);
            if (quote == null)
                throw new NotFoundException(nameof(Quote), id);

            quote.UpdateText(updateQuoteDto.Text);
            // Assuming Quote entity has a method to update page number
            if (updateQuoteDto.PageNumber.HasValue)
            {
                 quote.UpdatePageNumber(updateQuoteDto.PageNumber.Value);
            }
            else
            {
                quote.RemovePageNumber();
            }


            await _quoteRepository.UpdateAsync(quote);
            await _unitOfWork.CommitAsync();

            // Fetch the quote with details to populate AuthorName and BookTitle for the DTO
            var updatedQuoteWithDetails = await _quoteRepository.GetByIdAsync(quote.Id);  // Assuming GetByIdAsync can populate these, or use GetQuotesWithDetailsAsync
            if (updatedQuoteWithDetails == null) throw new NotFoundException(nameof(Quote), quote.Id);


            return _mapper.Map<QuoteDto>(updatedQuoteWithDetails);
        }

        public async Task DeleteQuoteAsync(Guid id)
        {
            var quote = await _quoteRepository.GetByIdAsync(id);
            if (quote == null)
                throw new NotFoundException(nameof(Quote), id);

            await _quoteRepository.DeleteAsync(quote);
            await _unitOfWork.CommitAsync();
        }
    }
}