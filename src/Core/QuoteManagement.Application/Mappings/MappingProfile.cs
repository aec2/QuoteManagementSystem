using AutoMapper;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Application.DTOs;

namespace QuoteManagement.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Quote, QuoteDto>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.Name))
                .ForMember(dest => dest.BookTitle, opt => opt.MapFrom(src => src.Book.Title))
                .ForMember(dest => dest.PageNumber, opt => opt.MapFrom(src => src.PageNumber != null ? src.PageNumber.Value : (int?)null));

            CreateMap<Author, AuthorDto>()
                .ForMember(dest => dest.QuoteCount, opt => opt.MapFrom(src => src.Quotes.Count));

            CreateMap<Book, BookDto>()
                .ForMember(dest => dest.QuoteCount, opt => opt.MapFrom(src => src.Quotes.Count))
                .ForMember(dest => dest.ISBN, opt => opt.MapFrom(src => src.ISBN != null ? src.ISBN.Value : null));

            CreateMap<ShareableLink, ShareableLinkDto>()
                .ForMember(dest => dest.FullUrl, opt => opt.Ignore()); // Will be set in service
        }
    }
}