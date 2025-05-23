namespace QuoteManagement.Domain.Exceptions
{
    public class InvalidQuoteException : DomainException
    {
        public InvalidQuoteException(string message) : base(message)
        {
        }

        public InvalidQuoteException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}