namespace ProductApi.Models;

public record ProductDto(int Id, string Name, decimal Price, string Color);

public record CreateRequest(string Name, decimal Price, string Color);

public record LoginRequest(string Username, string Password);
