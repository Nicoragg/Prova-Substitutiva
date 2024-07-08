var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AcessoTotal",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.MapGet("/", () => "Prova Substitutiva - Nicolas");
app.UseCors("AcessoTotal");



app.Run();
