using AutoMapper;
using Moq;
using QuoteManagement.Application.DTOs;
using QuoteManagement.Application.Interfaces;
using QuoteManagement.Application.Mappings;
using QuoteManagement.Application.Services;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Interfaces;

namespace QuoteManagement.Application.Tests;

public class QuoteServiceTests
{
    private readonly IMapper _mapper;

    public QuoteServiceTests()
    {
        var configuration = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
        _mapper = configuration.CreateMapper();
    }

    [Fact]
    public async Task CreateQuoteAsync_AddsQuoteAndReturnsDto()
    {
        // Arrange
        var author = new Author("Test Author");
        var book = new Book("Test Book", "1234567890");

        var createDto = new CreateQuoteDto
        {
            Text = "Quote text",
            AuthorId = author.Id,
            BookId = book.Id,
            PageNumber = 42
        };

        var quoteRepo = new Mock<IQuoteRepository>();
        var authorRepo = new Mock<IAuthorRepository>();
        var bookRepo = new Mock<IBookRepository>();
        var unitOfWork = new Mock<IUnitOfWork>();

        authorRepo.Setup(r => r.GetByIdAsync(author.Id)).ReturnsAsync(author);
        bookRepo.Setup(r => r.GetByIdAsync(book.Id)).ReturnsAsync(book);

        Quote savedQuote = null!;
        quoteRepo.Setup(r => r.AddAsync(It.IsAny<Quote>()))
                 .Callback<Quote>(q => savedQuote = q)
                 .ReturnsAsync((Quote q) => q);

        quoteRepo.Setup(r => r.GetByIdAsync(It.IsAny<Guid>()))
                 .ReturnsAsync(() =>
                 {
                     var persisted = new Quote(savedQuote.Text, author.Id, book.Id, savedQuote.PageNumber?.Value);
                     typeof(Quote).GetProperty("Author")!.SetValue(persisted, author);
                     typeof(Quote).GetProperty("Book")!.SetValue(persisted, book);
                     typeof(Quote).GetProperty("Id")!.SetValue(persisted, savedQuote.Id);
                     return persisted;
                 });

        var service = new QuoteService(quoteRepo.Object, authorRepo.Object, bookRepo.Object, unitOfWork.Object, _mapper);

        // Act
        var result = await service.CreateQuoteAsync(createDto);

        // Assert
        Assert.Equal(createDto.Text, result.Text);
        Assert.Equal(author.Id, result.AuthorId);
        Assert.Equal(book.Id, result.BookId);
        Assert.Equal(createDto.PageNumber, result.PageNumber);
        quoteRepo.Verify(r => r.AddAsync(It.IsAny<Quote>()), Times.Once);
        unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
    }

    [Fact]
    public async Task UpdateQuoteAsync_UpdatesQuoteAndReturnsDto()
    {
        // Arrange
        var author = new Author("Author");
        var book = new Book("Book");
        var quote = new Quote("Old", author.Id, book.Id);
        typeof(Quote).GetProperty("Author")!.SetValue(quote, author);
        typeof(Quote).GetProperty("Book")!.SetValue(quote, book);

        var updateDto = new UpdateQuoteDto { Text = "New Text", PageNumber = 100 };

        var quoteRepo = new Mock<IQuoteRepository>();
        var authorRepo = new Mock<IAuthorRepository>();
        var bookRepo = new Mock<IBookRepository>();
        var unitOfWork = new Mock<IUnitOfWork>();

        quoteRepo.SetupSequence(r => r.GetByIdAsync(quote.Id))
                 .ReturnsAsync(quote)
                 .ReturnsAsync(() => quote);

        var service = new QuoteService(quoteRepo.Object, authorRepo.Object, bookRepo.Object, unitOfWork.Object, _mapper);

        // Act
        var result = await service.UpdateQuoteAsync(quote.Id, updateDto);

        // Assert
        Assert.Equal(updateDto.Text, result.Text);
        Assert.Equal(updateDto.PageNumber, result.PageNumber);
        quoteRepo.Verify(r => r.UpdateAsync(quote), Times.Once);
        unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
    }
}

