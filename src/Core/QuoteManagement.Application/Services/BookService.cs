using AutoMapper;
using QuoteManagement.Application.Common.Exceptions;
using QuoteManagement.Application.DTOs;
using QuoteManagement.Application.Interfaces;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Interfaces;

namespace QuoteManagement.Application.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BookService(
            IBookRepository bookRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _bookRepository = bookRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookDto>> GetAllBooksAsync()
        {
            var books = await _bookRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<BookDto>>(books);
        }

        public async Task<BookDto> GetBookByIdAsync(Guid id)
        {
            var book = await _bookRepository.GetByIdAsync(id);
            if (book == null)
                throw new NotFoundException(nameof(Book), id);

            return _mapper.Map<BookDto>(book);
        }

        public async Task<IEnumerable<BookDto>> SearchBooksAsync(string searchTerm)
        {
            var books = await _bookRepository.SearchByTitleAsync(searchTerm);
            return _mapper.Map<IEnumerable<BookDto>>(books);
        }

        public async Task<BookDto> CreateBookAsync(string title, string isbn = "")
        {
            var book = new Book(title, isbn);
            await _bookRepository.AddAsync(book);
            await _unitOfWork.CommitAsync();

            return _mapper.Map<BookDto>(book);
        }

        public async Task<BookDto> UpdateBookAsync(Guid id, string title, string isbn = "")
        {
            var book = await _bookRepository.GetByIdAsync(id);
            if (book == null)
                throw new NotFoundException(nameof(Book), id);

            book.UpdateTitle(title);
            if (isbn != null) // Allow clearing ISBN by passing null or empty string
            {
                 book.UpdateISBN(isbn);
            } else if (string.IsNullOrEmpty(isbn))
            {
                 book.UpdateISBN(null); // Explicitly set to null if empty string is passed
            }


            await _bookRepository.UpdateAsync(book);
            await _unitOfWork.CommitAsync();

            return _mapper.Map<BookDto>(book);
        }

        public async Task DeleteBookAsync(Guid id)
        {
            var book = await _bookRepository.GetByIdAsync(id);
            if (book == null)
                throw new NotFoundException(nameof(Book), id);

            await _bookRepository.DeleteAsync(book);
            await _unitOfWork.CommitAsync();
        }
    }
}