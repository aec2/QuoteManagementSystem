namespace QuoteManagement.Domain.ValueObjects
{
    public class PageNumber : ValueObject
    {
        public int Value { get; }

        public PageNumber(int value)
        {
            if (value <= 0)
                throw new ArgumentException("Page number must be greater than zero.", nameof(value));

            Value = value;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }

        public override string ToString() => Value.ToString();

        public static implicit operator int(PageNumber pageNumber) => pageNumber.Value;
        public static explicit operator PageNumber(int value) => new PageNumber(value);
    }
}