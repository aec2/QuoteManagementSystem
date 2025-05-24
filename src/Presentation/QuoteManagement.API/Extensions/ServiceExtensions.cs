// In src/Presentation/QuoteManagement.API/Extensions/ServiceExtensions.cs
using Microsoft.Extensions.DependencyInjection; // Required for IServiceCollection
using Microsoft.OpenApi.Models; // Required for OpenApiInfo

namespace QuoteManagement.API.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddOpenApiDocumentation(this IServiceCollection services) // Renamed for clarity
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Quote Management API", Version = "v1" });
                // Add other Swagger configurations here (e.g., security definitions)
            });
        }
    }
}