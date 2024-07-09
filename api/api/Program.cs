using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Context>();

builder.Services.AddCors(
    options =>
    {
        options.AddPolicy("AcessoTotal",
            builder => builder.
                AllowAnyOrigin().
                AllowAnyHeader().
                AllowAnyMethod());
    }
);

var app = builder.Build();
app.UseCors("AcessoTotal");

// ALTERAR
app.MapPut("/api/alterar/aluno/{id}", ([FromServices] Context ctx, [FromBody] Aluno AlunoAlterado) =>
{
    Aluno? Aluno = ctx.Alunos.Find(AlunoAlterado.Id);
    
    if (Aluno is null) return Results.NotFound("Aluno não encontrado!");
    
    Aluno.Nome = AlunoAlterado.Nome;
    Aluno.DataNasc = AlunoAlterado.DataNasc;

    ctx.Alunos.Update(Aluno);
    ctx.SaveChanges();

    return Results.Ok("Aluno alterado com sucesso!");
});

app.MapPut("/api/alterar/imc/{id}", ([FromServices] Context ctx, [FromBody] Imc ImcAlterado, [FromRoute] int id) =>
{

    Imc? Imc = ctx.Imcs.FirstOrDefault(a => a.AlunoId == id);
    
    if (Imc is null) return Results.NotFound("Imc não encontrado ou não cadastrado!");
    Aluno? Alun = ctx.Alunos.Find(Imc.AlunoId);

    Imc.Aluno = Alun;
    Imc.Peso = ImcAlterado.Peso;
    Imc.Altura = ImcAlterado.Altura;
    Imc.Im = ImcAlterado.Peso/(ImcAlterado.Altura * ImcAlterado.Altura);
    
    if(Imc.Im < 18.5) Imc.Classificacao = "Magreza - GRAU 0";
    if(Imc.Im >= 18.6) Imc.Classificacao = "Normal - GRAU 0";
    if(Imc.Im >= 25.0) Imc.Classificacao = "Sobrepeso - GRAU I";
    if(Imc.Im >= 30.0) Imc.Classificacao = "Obesidade - GRAU II";
    if(Imc.Im >= 40.0) Imc.Classificacao = "Obesidade Grave - GRAU III";
    
    ctx.Imcs.Update(Imc);
    ctx.SaveChanges();
    return Results.Created("", Imc);
});

// CADASTRAR
app.MapPost("api/alunos/cadastrar", ([FromServices] Context ctx, [FromBody] Aluno Aluno) =>
{
    ctx.Alunos.Add(Aluno);
    ctx.SaveChanges();
    return Results.Created("", Aluno);
});

// CADASTRAR
app.MapPost("api/imc/cadastrar/{id}", ([FromServices] Context ctx, [FromBody] Imc NovoImc, [FromRoute] int id) =>
{
    Imc? Imc = ctx.Imcs.FirstOrDefault(a => a.AlunoId == id);
    
    if (Imc is null) Imc = new Imc();

    Aluno? Aluno = ctx.Alunos.FirstOrDefault(a => a.Id == id);

    if(Aluno is null) return Results.NotFound("Aluno não encontrado ou não cadastrado!");

    Imc.AlunoId = id;
    Imc.Aluno = Aluno;
    Imc.Peso = NovoImc.Peso;
    Imc.Altura = NovoImc.Altura;
    Imc.Im = NovoImc.Peso/(NovoImc.Altura * NovoImc.Altura);
    
    if(Imc.Im < 18.5) Imc.Classificacao = "Magreza - GRAU 0";
    if(Imc.Im >= 18.6) Imc.Classificacao = "Normal - GRAU 0";
    if(Imc.Im >= 25.0) Imc.Classificacao = "Sobrepeso - GRAU I";
    if(Imc.Im >= 30.0) Imc.Classificacao = "Obesidade - GRAU II";
    if(Imc.Im >= 40.0) Imc.Classificacao = "Obesidade Grave - GRAU III";
    
    ctx.Imcs.Add(Imc);
    ctx.SaveChanges();
    return Results.Created("", Imc);
});

// lISTAR
app.MapGet("/api/imc/listar", ([FromServices] Context ctx) =>
{
    return Results.Ok(ctx.Imcs.Include(x => x.Aluno).ToList());
});

app.MapGet("/api/alunos/listar", ([FromServices] Context ctx) =>
{

    var alunos = ctx.Alunos.ToList();
    if (alunos.Any())
    {
        return Results.Ok(alunos);
    }
    return Results.NotFound("Não existem usuários na tabela");
});

app.MapGet("/api/imc/listar/{id}", ([FromServices] Context ctx, [FromRoute] int id) =>
{
    Imc? Imc = ctx.Imcs.Include(x => x.Aluno).FirstOrDefault(a => a.AlunoId == id);

    if (Imc is not null) return Results.Ok(Imc);
    
    return Results.NotFound("Nenhum IMC cadastrado");
});

app.Run();
