namespace QuoteManagement.Domain.ValueObjects
{
    public class ISBN : ValueObject
    {
        public string Value { get; }

        public ISBN(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("ISBN cannot be empty.", nameof(value));

            // Remove hyphens and spaces
            var cleanedValue = value.Replace("-", "").Replace(" ", "");

            if (!IsValidISBN(cleanedValue))
                throw new ArgumentException("Invalid ISBN format.", nameof(value));

            Value = cleanedValue;
        }

        private static bool IsValidISBN(string isbn)
        {
            // Check for ISBN-10 or ISBN-13
            return isbn.Length == 10 || isbn.Length == 13;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }

        public override string ToString() => Value;
    }
}