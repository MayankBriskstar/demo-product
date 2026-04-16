using ProductApi.Data;
using ProductApi.Models;

namespace ProductApi.Services;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetItems();
    Task<IEnumerable<ProductDto>> GetByColor(string color);
    Task<ProductDto> Create(CreateRequest request);
}

public class ProductService : IProductService
{
    private readonly IProductRepository _repo;

    public ProductService(IProductRepository repo) => _repo = repo;

    public async Task<IEnumerable<ProductDto>> GetItems()
    {
        var items = await _repo.GetAll();
        return items.Select(i => new ProductDto(i.Id, i.Name, i.Price, i.Color));
    }

    public async Task<IEnumerable<ProductDto>> GetByColor(string color)
    {
        var items = await _repo.GetByColor(color);
        return items.Select(i => new ProductDto(i.Id, i.Name, i.Price, i.Color));
    }

    public async Task<ProductDto> Create(CreateRequest req)
    {
        var item = new Product
        {
            Name = req.Name,
            Price = req.Price,
            Color = req.Color
        };

        await _repo.Add(item);
        return new ProductDto(item.Id, item.Name, item.Price, item.Color);
    }
}
