using Microsoft.EntityFrameworkCore;
using QuoteManagement.Domain.Entities;
using QuoteManagement.Domain.Interfaces;
using QuoteManagement.Persistence.Context;
using QuoteManagement.Persistence.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuoteManagement.Persistence.Repositories
{
    public class AuthorRepository : Repository<Author>, IAuthorRepository
    {
        public AuthorRepository(QuoteManagementDbContext context) : base(context)
        {
        }

        public async Task<Author> GetByNameAsync(string name)
        {
            return await _dbSet.FirstOrDefaultAsync(a => a.Name == name);
        }

        public async Task<IEnumerable<Author>> SearchByNameAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return await GetAllAsync();

            return await _dbSet.Where(a => a.Name.Contains(searchTerm)).ToListAsync();
        }

        // Example of overriding to include related data if needed by default for this repository
        public override async Task<Author> GetByIdAsync(Guid id)
        {
            return await _dbSet.Include(a => a.Quotes).FirstOrDefaultAsync(a => a.Id == id);
        }

        public override async Task<IEnumerable<Author>> GetAllAsync()
        {
            return await _dbSet.Include(a => a.Quotes).ToListAsync();
        }
    }
    
}