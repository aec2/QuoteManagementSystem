using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QuoteManagement.Application.Common.Interfaces; // Required for IDateTime
using QuoteManagement.Infrastructure.Services; // Required for DateTimeService

namespace QuoteManagement.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Example: if you had an email service or other infrastructure services
            // services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            // services.AddTransient<IEmailService, EmailService>();

            services.AddSingleton<IDateTime, DateTimeService>();

            return services;
        }
    }
}