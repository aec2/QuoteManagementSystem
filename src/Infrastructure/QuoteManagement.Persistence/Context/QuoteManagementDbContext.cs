using Microsoft.EntityFrameworkCore;
using QuoteManagement.Application.Common.Interfaces;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Common; // Required for IAuditableEntity
using System.Reflection; // Required for ApplyConfigurationsFromAssembly

namespace QuoteManagement.Persistence.Context
{
    public class QuoteManagementDbContext : DbContext
    {
        private readonly IDateTime _dateTime;

        public QuoteManagementDbContext(DbContextOptions<QuoteManagementDbContext> options, IDateTime dateTime)
            : base(options)
        {
            _dateTime = dateTime;
        }
        
        // Parameterless constructor for migrations if needed, though with in-memory, less critical
        public QuoteManagementDbContext(DbContextOptions<QuoteManagementDbContext> options)
           : base(options)
        {
            // This constructor might be used by tools like EF Core migrations
            // if IDateTime is not available at design time.
            // Consider how IDateTime would be resolved in such scenarios,
            // or provide a design-time DbContextFactory.
            // For now, let's assume it's okay for in-memory or that IDateTime will be available.
        }


        public DbSet<Quote> Quotes { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<ShareableLink> ShareableLinks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // This line can be kept if you plan to add IEntityTypeConfiguration classes,
            // or removed/commented out if you define all configurations here.
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            // Configure ISBN as an owned type for Book
            modelBuilder.Entity<Book>(b =>
            {
                b.OwnsOne(e => e.ISBN, isbnNavigationBuilder =>
                {
                    // This tells EF Core to map the 'Value' property of the ISBN object
                    // to a column named "ISBN" in the "Books" table.
                    isbnNavigationBuilder.Property(isbn => isbn.Value).HasColumnName("ISBN");
                });
            });

            // Configure PageNumber as an owned type for Quote
            modelBuilder.Entity<Quote>(q =>
            {
                q.OwnsOne(e => e.PageNumber, pageNumberNavigationBuilder =>
                {
                    // This tells EF Core to map the 'Value' property of the PageNumber object
                    // to a column named "PageNumber" in the "Quotes" table.
                    pageNumberNavigationBuilder.Property(pn => pn.Value).HasColumnName("PageNumber");
                });
            });

            base.OnModelCreating(modelBuilder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<IAuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        // DateAdded is set in entity constructor for Quote
                        // If other auditable entities need it:
                        // if (entry.Entity is Quote quote) quote.DateAdded = _dateTime.UtcNow;
                        break;
                    case EntityState.Modified:
                        entry.Property("DateModified").CurrentValue = _dateTime.UtcNow;
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}