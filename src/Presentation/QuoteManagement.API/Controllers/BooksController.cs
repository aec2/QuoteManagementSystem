using Microsoft.AspNetCore.Mvc;
using QuoteManagement.Application.DTOs; // Required for BookDto
using QuoteManagement.Application.Interfaces; // Required for IBookService
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QuoteManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDto>>> GetAllBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookDto>> GetBook(Guid id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            return Ok(book);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<BookDto>>> SearchBooks([FromQuery] string term)
        {
            var books = await _bookService.SearchBooksAsync(term);
            return Ok(books);
        }

        [HttpPost]
        public async Task<ActionResult<BookDto>> CreateBook([FromBody] BookCreateDto bookCreateDto) // Assuming DTO
        {
            if (bookCreateDto == null || string.IsNullOrWhiteSpace(bookCreateDto.Title))
            {
                return BadRequest("Book title is required.");
            }
            var book = await _bookService.CreateBookAsync(bookCreateDto.Title, bookCreateDto.ISBN);
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BookDto>> UpdateBook(Guid id, [FromBody] BookUpdateDto bookUpdateDto) // Assuming DTO
        {
            if (bookUpdateDto == null || string.IsNullOrWhiteSpace(bookUpdateDto.Title))
            {
                return BadRequest("Book title is required for update.");
            }
            var book = await _bookService.UpdateBookAsync(id, bookUpdateDto.Title, bookUpdateDto.ISBN);
            return Ok(book);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            await _bookService.DeleteBookAsync(id);
            return NoContent();
        }
    }

    // Simple DTOs for Book creation and update
    public class BookCreateDto
    {
        public string Title { get; set; }
        public string ISBN { get; set; }
    }

    public class BookUpdateDto
    {
        public string Title { get; set; }
        public string ISBN { get; set; }
    }
}