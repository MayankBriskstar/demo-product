using System.Net;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;

namespace ProductUnitTest;

public class ProductIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public ProductIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task HealthCheck_ReturnsOk()
    {
        var client = _factory.CreateClient();
        var response = await client.GetAsync("/api/products/health");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}
