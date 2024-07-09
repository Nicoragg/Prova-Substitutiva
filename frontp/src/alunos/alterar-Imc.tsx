import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Imc } from '../../../src/models/imc';

function AlterarImc() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  useEffect(() => {
    if (id) {
      carregarImc(id);
    }
  }, [id]);

  async function carregarImc(id: string) {
    try {
      const response = await fetch(`http://localhost:5204/api/imc/listar/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar imc');
      }
      const data = await response.json();
      setAltura(data.altura);
      setPeso(data.peso);
    } catch (error) {
      console.error('Erro ao carregar imc:', error);
    }
  }

  async function alterar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const imc: Imc = {
      altura, peso,
      Imc: '',
      classificacao: '',
      alunoId: '',
    };

    try {
      const response = await fetch(`http://localhost:5204/api/Imc/alterar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imc),
      });

      if (!response.ok) {
        throw new Error('Erro ao alterar');
      }

      const data = await response.json();
      console.log('Imc alterad:', data);
      navigate("/imcs/listar");
    } catch (error) {
      console.error('Erro ao alterar Imc:', error);
    }
  }

  return (
    <div>
      <h1>Alterar Imc</h1>
      <form onSubmit={alterar}>
        <label>Peso:</label>
        <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} required />
        <br />
        <label>Altura:</label>
        <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} required />
        <br />
        <button type="submit">Alterar</button>
      </form>
    </div>
  );
}

export default AlterarImc;
