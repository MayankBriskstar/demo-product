using ProductApi.Models;


namespace ProductApi.Data;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAll();
    Task<IEnumerable<Product>> GetByColor(string color);
    Task Add(Product product);
}

public class ProductRepository : IProductRepository
{
    private static readonly List<Product> _items = new()
    {
        new Product { Id = 1, Name = "Smartphone X", Price = 999.99m, Color = "Black" },
        new Product { Id = 2, Name = "Laptop Pro", Price = 1499.99m, Color = "Silver" },
        new Product { Id = 3, Name = "Wireless Buds", Price = 199.99m, Color = "Black" }
    };

    public Task<IEnumerable<Product>> GetAll() => Task.FromResult<IEnumerable<Product>>(_items);

    public Task<IEnumerable<Product>> GetByColor(string color) => 
        Task.FromResult(_items.Where(p => p.Color.Equals(color, StringComparison.OrdinalIgnoreCase)));

    public Task Add(Product product)
    {
        product.Id = _items.Count > 0 ? _items.Max(p => p.Id) + 1 : 1;
        _items.Add(product);
        return Task.CompletedTask;
    }
}
