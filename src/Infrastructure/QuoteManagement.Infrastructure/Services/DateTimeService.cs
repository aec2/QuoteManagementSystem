using QuoteManagement.Application.Common.Interfaces;
using System;

namespace QuoteManagement.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
        public DateTime UtcNow => DateTime.UtcNow;
    }
}