using Microsoft.AspNetCore.Mvc;
using QuoteManagement.Application.DTOs;   // Required for DTOs
using QuoteManagement.Application.Interfaces; // Required for IShareService
using System;
using System.Threading.Tasks;

namespace QuoteManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Or just "share" if you prefer /share/{shortCode} directly
    public class ShareController : ControllerBase
    {
        private readonly IShareService _shareService;

        public ShareController(IShareService shareService)
        {
            _shareService = shareService;
        }

        [HttpPost("link")] // POST api/share/link
        public async Task<ActionResult<ShareableLinkDto>> CreateShareableLink([FromBody] CreateShareLinkRequestDto request)
        {
            if (request == null) return BadRequest("Request body is null.");
            var link = await _shareService.CreateShareableLinkAsync(request.QuoteId, request.ExpiryDate);
            return Ok(link);
        }

        [HttpGet("{shortCode}")] // GET api/share/{shortCode}
        public async Task<ActionResult<QuoteDto>> GetQuoteByShortCode(string shortCode)
        {
            // Increment view count first, then try to get the quote
            // This ensures views are counted even if the quote is immediately accessed
            // and potentially cached by the client or a proxy.
            await _shareService.IncrementViewCountAsync(shortCode);
            var quote = await _shareService.GetQuoteByShortCodeAsync(shortCode);
            return Ok(quote); // NotFoundException handled by middleware
        }

        [HttpGet("link/{shortCode}")] // GET api/share/link/{shortCode}
        public async Task<ActionResult<ShareableLinkDto>> GetShareableLinkDetails(string shortCode)
        {
            var linkDetails = await _shareService.GetShareableLinkAsync(shortCode);
            return Ok(linkDetails); // NotFoundException handled by middleware
        }
    }

}