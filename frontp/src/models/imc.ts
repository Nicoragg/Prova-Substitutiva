import { Aluno } from "./aluno";

export interface Imc {
  ImcId?: string;
  Imc: string;
  classificacao: string;
  peso: string;
  altura?: string;
  alunoId: string;
  aluno?: Aluno;
  criadoEm?: string;
}