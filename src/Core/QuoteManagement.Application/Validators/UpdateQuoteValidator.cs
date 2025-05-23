using FluentValidation;
using QuoteManagement.Application.DTOs;

namespace QuoteManagement.Application.Validators
{
    public class UpdateQuoteValidator : AbstractValidator<UpdateQuoteDto>
    {
        public UpdateQuoteValidator()
        {
            RuleFor(x => x.Text)
                .NotEmpty().WithMessage("Quote text is required.")
                .MaximumLength(5000).WithMessage("Quote text must not exceed 5000 characters.");

            RuleFor(x => x.PageNumber)
                .GreaterThan(0).When(x => x.PageNumber.HasValue)
                .WithMessage("Page number must be greater than 0.");
        }
    }
}