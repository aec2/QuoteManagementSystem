using FluentValidation;
using QuoteManagement.Application.DTOs;

namespace QuoteManagement.Application.Validators
{
    public class CreateQuoteValidator : AbstractValidator<CreateQuoteDto>
    {
        public CreateQuoteValidator()
        {
            RuleFor(x => x.Text)
                .NotEmpty().WithMessage("Quote text is required.")
                .MaximumLength(5000).WithMessage("Quote text must not exceed 5000 characters.");

            RuleFor(x => x.AuthorName)
                .NotEmpty().When(x => !x.AuthorId.HasValue)
                .WithMessage("Author name is required when AuthorId is not provided.");

            RuleFor(x => x.BookTitle)
                .NotEmpty().When(x => !x.BookId.HasValue)
                .WithMessage("Book title is required when BookId is not provided.");

            RuleFor(x => x.PageNumber)
                .GreaterThan(0).When(x => x.PageNumber.HasValue)
                .WithMessage("Page number must be greater than 0.");

            RuleFor(x => x.ISBN)
                .Matches(@"^(97[89])?\d{9}(\d|X)$").When(x => !string.IsNullOrEmpty(x.ISBN))
                .WithMessage("Invalid ISBN format.");
        }
    }
}