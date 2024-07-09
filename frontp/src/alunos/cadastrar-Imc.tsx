import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { Imc } from "../../../src/models/imc";

function CadastrarImc() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  function cadastrar(e: any) {
    const Imc: Imc = {
      peso: peso,
      altura: altura,
      Imc: "",
      classificacao: "",
      alunoId: ""
    };

    fetch(`http://localhost:5204/api/imc/cadastrar/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Imc),
    })
      .then((resposta) => resposta.json())
      .then((Imc: Imc) => {
        navigate("/imcs/listar");
      });
    e.preventDefault();
  }

  return (
    <div>
    <div>
      <h1>Alterar Imc</h1>
      <form onSubmit={cadastrar}>
        <label>Peso:</label>
        <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} required />
        <br />
        <label>Altura:</label>
        <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} required />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
    </div>
  );
}

export default CadastrarImc;