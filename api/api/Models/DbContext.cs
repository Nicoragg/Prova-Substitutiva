using Microsoft.EntityFrameworkCore;

public class Context : DbContext
{

    public DbSet<Imc> Imcs { get; set; }
    public DbSet<Aluno> Alunos { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=nicolas_nicolas.db");
    }
}