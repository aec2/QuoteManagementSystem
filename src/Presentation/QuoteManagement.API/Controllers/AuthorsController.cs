using Microsoft.AspNetCore.Mvc;
using QuoteManagement.Application.Common.Models;
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
        public async Task<ActionResult<ApiResponse<IEnumerable<AuthorDto>>>> GetAllAuthors()
        {
            try
            {
                var authors = await _authorService.GetAllAuthorsAsync();
                return Ok(ApiResponse<IEnumerable<AuthorDto>>.Succeed(authors));
            }
            catch (Exception ex)
            {
                return Ok(ApiResponse<IEnumerable<AuthorDto>>.Fail("Failed to fetch authors", new List<string> { ex.Message }));
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<AuthorDto>>> GetAuthor(Guid id)
        {
            try
            {
                var author = await _authorService.GetAuthorByIdAsync(id);
                return Ok(ApiResponse<AuthorDto>.Succeed(author));
            }
            catch (Exception ex)
            {
                return Ok(ApiResponse<AuthorDto>.Fail("Failed to fetch author", new List<string> { ex.Message }));
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<ApiResponse<IEnumerable<AuthorDto>>>> SearchAuthors([FromQuery] string term)
        {
            try
            {
                var authors = await _authorService.SearchAuthorsAsync(term);
                return Ok(ApiResponse<IEnumerable<AuthorDto>>.Succeed(authors));
            }
            catch (Exception ex)
            {
                return Ok(ApiResponse<IEnumerable<AuthorDto>>.Fail("Failed to search authors", new List<string> { ex.Message }));
            }
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<AuthorDto>>> CreateAuthor([FromBody] AuthorCreateDto authorCreateDto)
        {
            if (authorCreateDto == null || string.IsNullOrWhiteSpace(authorCreateDto.Name))
            {
                return Ok(ApiResponse<AuthorDto>.Fail("Author name is required."));
            }

            try
            {
                var author = await _authorService.CreateAuthorAsync(authorCreateDto.Name);
                return Ok(ApiResponse<AuthorDto>.Succeed(author, "Author created successfully"));
            }
            catch (Exception ex)
            {
                return Ok(ApiResponse<AuthorDto>.Fail("Failed to create author", new List<string> { ex.Message }));
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<AuthorDto>>> UpdateAuthor(Guid id, [FromBody] AuthorUpdateDto authorUpdateDto)
        {
            if (authorUpdateDto == null || string.IsNullOrWhiteSpace(authorUpdateDto.Name))
            {
                return Ok(ApiResponse<AuthorDto>.Fail("Author name is required for update."));
            }

            try
            {
                var author = await _authorService.UpdateAuthorAsync(id, authorUpdateDto.Name);
                return Ok(ApiResponse<AuthorDto>.Succeed(author, "Author updated successfully"));
            }
            catch (Exception ex)
            {
                return Ok(ApiResponse<AuthorDto>.Fail("Failed to update author", new List<string> { ex.Message }));
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteAuthor(Guid id)
        {
            try
            {
                await _authorService.DeleteAuthorAsync(id);
                return Ok(ApiResponse<bool>.Succeed(true, "Author deleted successfully"));
            }
            catch (Exception ex)
            {
                return Ok(ApiResponse<bool>.Fail("Failed to delete author", new List<string> { ex.Message }));
            }
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