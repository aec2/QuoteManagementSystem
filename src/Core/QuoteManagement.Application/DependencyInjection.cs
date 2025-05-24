using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using QuoteManagement.Application.Interfaces;
using QuoteManagement.Application.Services;
using FluentValidation; // Required for AddValidatorsFromAssembly

namespace QuoteManagement.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            services.AddScoped<IAuthorService, AuthorService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IQuoteService, QuoteService>();
            services.AddScoped<IShareService, ShareService>();
            
            // If you have MediatR setup, it would go here:
            // services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
            // services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));


            return services;
        }
    }
}