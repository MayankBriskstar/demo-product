using FluentAssertions;
using Moq;
using ProductApi.Data;
using ProductApi.Models;
using ProductApi.Services;

namespace ProductUnitTest;

public class ProductServiceTests
{
    private readonly Mock<IProductRepository> _repoMock;
    private readonly ProductApi.Services.ProductService _service;

    public ProductServiceTests()
    {
        _repoMock = new Mock<IProductRepository>();
        _service = new ProductApi.Services.ProductService(_repoMock.Object);
    }

    [Fact]
    public async Task GetItems_ReturnsAll()
    {
        var items = new List<Product>
        {
            new() { Id = 1, Name = "P1", Color = "Red" },
            new() { Id = 2, Name = "P2", Color = "Blue" }
        };
        _repoMock.Setup(r => r.GetAll()).ReturnsAsync(items);

        var result = await _service.GetItems();

        result.Should().HaveCount(2);
        result.First().Name.Should().Be("P1");
    }

    [Fact]
    public async Task GetByColor_ReturnsFiltered()
    {
        var items = new List<Product>
        {
            new() { Id = 1, Name = "Red Item", Color = "Red" }
        };
        _repoMock.Setup(r => r.GetByColor("Red")).ReturnsAsync(items);

        var result = await _service.GetByColor("Red");

        result.Should().HaveCount(1);
        result.First().Color.Should().Be("Red");
    }
}
