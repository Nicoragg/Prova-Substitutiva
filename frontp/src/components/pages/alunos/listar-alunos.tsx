import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Aluno } from "../../../models/aluno";

function ListarAlunos() {
  const [Alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function carregarAlunos() {
    try {
      const response = await fetch('http://localhost:5204/api/alunos/listar');
      if (!response.ok) {
        throw new Error('Erro ao buscar Alunos');
      }
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error('Erro ao carregar Alunos:', error);
    }
  }

  return (
    <div>
      <h1>Listar Alunos</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Data Nascimento</th>
            <th>---------------</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {Alunos.map((aluno) => (
            <tr key={aluno.alunoId}>
              <td>{aluno.alunoId}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.dataNasc}</td>
              <td>
                <Link to={`/imc/cadastrar/${aluno.alunoId}`}>Cadastrar Novo Imc</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarAlunos;
