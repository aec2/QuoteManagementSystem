using Microsoft.AspNetCore.Mvc;
using QuoteManagement.Application.DTOs; // Required for AuthorDto
using QuoteManagement.Application.Interfaces; // Required for IAuthorService
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QuoteManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorsController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuthorDto>>> GetAllAuthors()
        {
            var authors = await _authorService.GetAllAuthorsAsync();
            return Ok(authors);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuthorDto>> GetAuthor(Guid id)
        {
            var author = await _authorService.GetAuthorByIdAsync(id);
            return Ok(author); // NotFoundException will be handled by middleware
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<AuthorDto>>> SearchAuthors([FromQuery] string term)
        {
            var authors = await _authorService.SearchAuthorsAsync(term);
            return Ok(authors);
        }

        [HttpPost]
        public async Task<ActionResult<AuthorDto>> CreateAuthor([FromBody] AuthorCreateDto authorCreateDto) // Assuming a simple DTO for creation
        {
            if (authorCreateDto == null || string.IsNullOrWhiteSpace(authorCreateDto.Name))
            {
                return BadRequest("Author name is required.");
            }
            var author = await _authorService.CreateAuthorAsync(authorCreateDto.Name);
            return CreatedAtAction(nameof(GetAuthor), new { id = author.Id }, author);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AuthorDto>> UpdateAuthor(Guid id, [FromBody] AuthorUpdateDto authorUpdateDto) // Assuming a simple DTO for update
        {
             if (authorUpdateDto == null || string.IsNullOrWhiteSpace(authorUpdateDto.Name))
            {
                return BadRequest("Author name is required for update.");
            }
            var author = await _authorService.UpdateAuthorAsync(id, authorUpdateDto.Name);
            return Ok(author);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(Guid id)
        {
            await _authorService.DeleteAuthorAsync(id);
            return NoContent();
        }
    }

    // Simple DTOs for Author creation and update (can be in DTOs folder)
    public class AuthorCreateDto
    {
        public string Name { get; set; }
    }

    public class AuthorUpdateDto
    {
        public string Name { get; set; }
    }
}