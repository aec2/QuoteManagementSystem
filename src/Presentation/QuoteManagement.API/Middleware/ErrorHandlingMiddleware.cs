using System.Net;
using System.Text.Json;
using QuoteManagement.Application.Common.Exceptions; // Required for NotFoundException

namespace QuoteManagement.API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception has occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError; // 500 if unexpected
            var result = JsonSerializer.Serialize(new { error = "An unexpected error occurred." });

            switch (exception)
            {
                case NotFoundException notFoundException:
                    code = HttpStatusCode.NotFound;
                    result = JsonSerializer.Serialize(new { error = notFoundException.Message });
                    break;
                case FluentValidation.ValidationException validationException:
                    code = HttpStatusCode.BadRequest;
                    // Flatten validation errors
                    var errors = validationException.Errors
                        .GroupBy(e => e.PropertyName)
                        .ToDictionary(
                            g => string.IsNullOrEmpty(g.Key) ? "_general" : g.Key, 
                            g => g.Select(e => e.ErrorMessage).ToArray()
                        );
                    result = JsonSerializer.Serialize(new { errors });
                    break;
                case ArgumentException argumentException: // Catch argument exceptions (e.g. from domain entities)
                    code = HttpStatusCode.BadRequest;
                    result = JsonSerializer.Serialize(new { error = argumentException.Message });
                    break;
                 // Add other custom exception types here
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}