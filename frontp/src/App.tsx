import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ListarAlunos from './components/pages/alunos/listar-alunos';
import ListarImcs from './components/pages/alunos/listar-imcs';
import Index from './components/pages/alunos/index';
import CadastrarAluno from './components/pages/alunos/cadastrar-aluno';
import CadastrarImc from './components/pages/alunos/cadastrar-Imc';

function App() {
  return (
    <div>
    <BrowserRouter>        
    <h1>Bem Vindo ao Cadastrador de Imc mais refinado da atualidade</h1><br/>
      <header>

      <nav>
        <ul>
          <li><Link to="/">Pagína Inicial</Link></li>
          <li><Link to="/alunos/listar">Listar Alunos</Link></li>
          <li><Link to="/imcs/listar">Listar Imcs</Link></li>
          <li><Link to="/cadastrar/aluno">Cadastrar Aluno</Link></li>
          <li><Link to="/cadastrar/imc">Cadastrar Novo Imc</Link></li>
        </ul>
      </nav>
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/alunos/listar" element={<ListarAlunos/>} />
          <Route path="/imcs/listar" element={<ListarImcs />} />
          <Route path="/cadastrar/aluno" element={<CadastrarAluno/>} />
          <Route path="/cadastrar/Imc" element={<CadastrarImc />} />
        </Routes>
      </section>
    </BrowserRouter>
    </div>
  );
}

export default App;
