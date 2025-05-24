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
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            // Example of configuring Value Objects if not using .OwnsOne in entity configurations
            // modelBuilder.Entity<Book>().OwnsOne(b => b.ISBN);
            // modelBuilder.Entity<Quote>().OwnsOne(q => q.PageNumber);


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