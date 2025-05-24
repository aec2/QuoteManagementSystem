using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QuoteManagement.Application.Interfaces;
using QuoteManagement.Domain.Interfaces;    // Required for IRepository and specific repositories
using QuoteManagement.Persistence.Context;
using QuoteManagement.Persistence.Repositories; // Required for Repository implementations and UnitOfWork

namespace QuoteManagement.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<QuoteManagementDbContext>(options =>
                options.UseInMemoryDatabase("QuoteManagementDb")); // Replace with your actual database provider

            // Register generic repository
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // Register specific repositories
            services.AddScoped<IAuthorRepository, AuthorRepository>();
            services.AddScoped<IBookRepository, BookRepository>();
            services.AddScoped<IQuoteRepository, QuoteRepository>();
            services.AddScoped<IShareableLinkRepository, ShareableLinkRepository>();
            // ShareableLink repository is already covered by the generic IRepository<ShareableLink>
            // but if it had specific methods, it would be:
            // services.AddScoped<IShareableLinkRepository, ShareableLinkRepository>();


            services.AddScoped<IUnitOfWork, UnitOfWork>();

            return services;
        }
    }
}