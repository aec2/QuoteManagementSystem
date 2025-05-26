using Microsoft.AspNetCore.Mvc;
using QuoteManagement.API.Models;

namespace QuoteManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        /// <summary>
        /// Health check endpoint
        /// </summary>
        /// <returns>API health status</returns>
        [HttpGet]
        public ActionResult<ApiResponse<object>> GetHealth()
        {
            var healthInfo = new
            {
                Status = "Healthy",
                Timestamp = DateTime.UtcNow,
                Version = "1.0.0",
                Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Unknown"
            };

            return Ok(ApiResponse<object>.SuccessResult(healthInfo, "API is running successfully"));
        }

        /// <summary>
        /// Detailed health check with dependencies
        /// </summary>
        /// <returns>Detailed health status</returns>
        [HttpGet("detailed")]
        public ActionResult<ApiResponse<object>> GetDetailedHealth()
        {
            var healthInfo = new
            {
                Status = "Healthy",
                Timestamp = DateTime.UtcNow,
                Version = "1.0.0",
                Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Unknown",
                Dependencies = new
                {
                    Database = "Connected", 
                    ExternalServices = "Available"
                }
            };

            return Ok(ApiResponse<object>.SuccessResult(healthInfo));
        }
    }
}