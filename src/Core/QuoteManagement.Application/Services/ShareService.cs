using AutoMapper;
using QuoteManagement.Application.Common.Exceptions;
using QuoteManagement.Application.DTOs;
using QuoteManagement.Application.Interfaces;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Interfaces;

namespace QuoteManagement.Application.Services
{
    public class ShareService : IShareService
    {
        private readonly IShareableLinkRepository _shareableLinkRepository;
        private readonly IQuoteRepository _quoteRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public ShareService(
            IShareableLinkRepository shareableLinkRepository,
            IQuoteRepository quoteRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IConfiguration configuration)
        {
            _shareableLinkRepository = shareableLinkRepository;
            _quoteRepository = quoteRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<ShareableLinkDto> CreateShareableLinkAsync(Guid quoteId, DateTime? expiryDate = null)
        {
            var quote = await _quoteRepository.GetByIdAsync(quoteId);
            if (quote == null)
                throw new NotFoundException(nameof(Quote), quoteId);

            var shortCode = GenerateShortCode();
            var shareableLink = new ShareableLink(quoteId, shortCode, expiryDate);

            await _shareableLinkRepository.AddAsync(shareableLink);
            await _unitOfWork.CommitAsync();

            var dto = _mapper.Map<ShareableLinkDto>(shareableLink);
            dto.FullUrl = $"{_configuration["BaseUrl"]}/share/{shortCode}";

            return dto;
        }

        public async Task<QuoteDto> GetQuoteByShortCodeAsync(string shortCode)
        {
            var shareableLink = await GetShareableLinkByShortCodeAsync(shortCode);
            if (shareableLink == null || shareableLink.IsExpired())
                throw new NotFoundException("Shareable link not found or expired");

            var quote = await _quoteRepository.GetByIdAsync(shareableLink.QuoteId);
            return _mapper.Map<QuoteDto>(quote);
        }

        public async Task<ShareableLinkDto> GetShareableLinkAsync(string shortCode)
        {
            var shareableLink = await GetShareableLinkByShortCodeAsync(shortCode);
            if (shareableLink == null)
                throw new NotFoundException("Shareable link not found");

            var dto = _mapper.Map<ShareableLinkDto>(shareableLink);
            dto.FullUrl = $"{_configuration["BaseUrl"]}/share/{shortCode}";

            return dto;
        }

        public async Task IncrementViewCountAsync(string shortCode)
        {
            var shareableLink = await GetShareableLinkByShortCodeAsync(shortCode);
            if (shareableLink != null && !shareableLink.IsExpired())
            {
                shareableLink.IncrementViewCount();
                await _shareableLinkRepository.UpdateAsync(shareableLink);
                await _unitOfWork.CommitAsync();
            }
        }

        private async Task<ShareableLink> GetShareableLinkByShortCodeAsync(string shortCode)
        {
            // This would need a custom repository method
            var allLinks = await _shareableLinkRepository.GetByShortCodeAsync(shortCode);
            return allLinks;
        }

        private string GenerateShortCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, 8)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}