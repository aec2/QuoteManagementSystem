using Microsoft.AspNetCore.Mvc;
using QuoteManagement.Application.Interfaces;
using QuoteManagement.Application.DTOs;

[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly IQuoteService _quoteService;
    
    public QuotesController(IQuoteService quoteService)
    {
        _quoteService = quoteService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuoteDto>>> GetAllQuotes()
    {
        var quotes = await _quoteService.GetAllQuotesAsync();
        return Ok(quotes);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<QuoteDto>> GetQuote(Guid id)
    {
        var quote = await _quoteService.GetQuoteByIdAsync(id);
        return Ok(quote);
    }
    
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<QuoteDto>>> SearchQuotes([FromQuery] string term)
    {
        var quotes = await _quoteService.SearchQuotesAsync(term);
        return Ok(quotes);
    }
    
    [HttpPost]
    public async Task<ActionResult<QuoteDto>> CreateQuote([FromBody] CreateQuoteDto createQuoteDto)
    {
        var quote = await _quoteService.CreateQuoteAsync(createQuoteDto);
        return CreatedAtAction(nameof(GetQuote), new { id = quote.Id }, quote);
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult<QuoteDto>> UpdateQuote(Guid id, [FromBody] UpdateQuoteDto updateQuoteDto)
    {
        var quote = await _quoteService.UpdateQuoteAsync(id, updateQuoteDto);
        return Ok(quote);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuote(Guid id)
    {
        await _quoteService.DeleteQuoteAsync(id);
        return NoContent();
    }
}