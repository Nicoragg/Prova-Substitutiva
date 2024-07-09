public class Imc
{
    public int? id { get; set; }
    public double? Im { get; set; }
    public string? Classificacao { get; set; }
    public double? Altura { get; set; }
    public double? Peso { get; set; }
    public int AlunoId { get; set; }
    public Aluno? Aluno { get; set; }
    public DateTime? CriandoEm { get; set; } = DateTime.Now;
}
