using AutoMapper;
using QuoteManagement.Application.Common.Exceptions;
using QuoteManagement.Application.DTOs;
using QuoteManagement.Application.Interfaces;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Interfaces;

namespace QuoteManagement.Application.Services
{
    public class AuthorService : IAuthorService
    {
        private readonly IAuthorRepository _authorRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AuthorService(
            IAuthorRepository authorRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _authorRepository = authorRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AuthorDto>> GetAllAuthorsAsync()
        {
            return new List<AuthorDto>
            {
                new AuthorDto { Id = Guid.NewGuid(), Name = "Mock Author 1", QuoteCount = 2 },
                new AuthorDto { Id = Guid.NewGuid(), Name = "Mock Author 2", QuoteCount = 5 }
            };
            //var authors = await _authorRepository.GetAllAsync();
            //return _mapper.Map<IEnumerable<AuthorDto>>(authors);
        }

        public async Task<AuthorDto> GetAuthorByIdAsync(Guid id)
        {
            var author = await _authorRepository.GetByIdAsync(id);
            if (author == null)
                throw new NotFoundException(nameof(Author), id);

            return _mapper.Map<AuthorDto>(author);
        }

        public async Task<IEnumerable<AuthorDto>> SearchAuthorsAsync(string searchTerm)
        {
            var authors = await _authorRepository.SearchByNameAsync(searchTerm);
            return _mapper.Map<IEnumerable<AuthorDto>>(authors);
        }

        public async Task<AuthorDto> CreateAuthorAsync(string name)
        {
            var author = new Author(name);
            await _authorRepository.AddAsync(author);
            await _unitOfWork.CommitAsync();

            return _mapper.Map<AuthorDto>(author);
        }

        public async Task<AuthorDto> UpdateAuthorAsync(Guid id, string name)
        {
            var author = await _authorRepository.GetByIdAsync(id);
            if (author == null)
                throw new NotFoundException(nameof(Author), id);

            author.UpdateName(name);
            await _authorRepository.UpdateAsync(author);
            await _unitOfWork.CommitAsync();

            return _mapper.Map<AuthorDto>(author);
        }

        public async Task DeleteAuthorAsync(Guid id)
        {
            var author = await _authorRepository.GetByIdAsync(id);
            if (author == null)
                throw new NotFoundException(nameof(Author), id);

            await _authorRepository.DeleteAsync(author);
            await _unitOfWork.CommitAsync();
        }
    }
}