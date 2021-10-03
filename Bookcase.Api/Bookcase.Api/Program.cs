var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors(cfg =>
{
    if (app.Environment.IsDevelopment())
    {
        cfg.AllowAnyOrigin();
        cfg.AllowAnyMethod();
        cfg.AllowAnyHeader();
    }
});

app.MapGet("/shelf", () => new[] { "OL6504102M", "OL21733390M", "OL24245739M" });

app.Run();
