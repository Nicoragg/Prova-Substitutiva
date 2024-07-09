import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Imc } from "../../../models/imc";

function ListarImcs() {
  const [Imcs, setImcs] = useState<Imc[]>([]);

  useEffect(() => {
    carregarImcs();
  }, []);

  async function carregarImcs() {
    try {
      const response = await fetch('http://localhost:5204/api/imc/listar');
      if (!response.ok) {
        throw new Error('Erro ao buscar Imcs');
      }
      const data = await response.json();
      setImcs(data);
    } catch (error) {
      console.error('Erro ao carregar Imcs:', error);
    }
  }

  return (
    <div>
      <h1>Listar Imcs</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome do Aluno</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Imc</th>
            <th>Classificação</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {Imcs.map((Imc) => (
            <tr key={Imc.ImcId}>
              <td>{Imc.ImcId}</td>
              <td>{Imc.aluno?.nome}</td>
              <td>{Imc.altura}</td>
              <td>{Imc.peso}</td>
              <td>{Imc.Imc}</td>
              <td>{Imc.classificacao}</td>
              <td>
                <Link to={`/Imc/alterar/${Imc.alunoId}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarImcs;
