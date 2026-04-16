using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductApi.Models;

using ProductApi.Services;

namespace ProductApi.Controllers;

[Authorize]
[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service) => _service = service;

    [AllowAnonymous]
    [HttpGet("health")]
    public IActionResult Health() => Ok(new { status = "Healthy", time = DateTime.Now });

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await _service.GetItems());

    [HttpGet("color/{color}")]
    public async Task<IActionResult> GetByColor(string color) => Ok(await _service.GetByColor(color));

    [HttpPost]
    public async Task<IActionResult> Create(CreateRequest req)
    {
        if (req.Price <= 0) return BadRequest("Fix the price.");
        
        var product = await _service.Create(req);
        return Ok(product);
    }
}
