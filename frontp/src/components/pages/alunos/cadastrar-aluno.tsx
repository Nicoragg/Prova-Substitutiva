import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Aluno } from "../../../models/aluno";

function CadastrarAluno() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState("");

  function cadastrar(e: any) {
    const Aluno: Aluno = {
      nome: nome,
      dataNasc: dataNasc,
    };

    fetch("http://localhost:5204/api/alunos/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Aluno),
    })
      .then((resposta) => resposta.json())
      .then((Aluno: Aluno) => {
        navigate("alunos/listar");
      });
    e.preventDefault();
  }

  return (
    <div>
      <h1>Cadastrar</h1>
      <form onSubmit={cadastrar}>
        <label>Nome:</label>
        <input type="text" placeholder="Digite o nome do aluno"
          onChange={(e: any) => setNome(e.target.value)} required
        />
        <br />
        <label>Data de Nascimento:</label>
        <input type="text" placeholder="Digite a data de nascimento com barras"
          onChange={(e: any) => setDataNasc(e.target.value)}
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarAluno;