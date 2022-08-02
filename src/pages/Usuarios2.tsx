import axios from 'axios';
import { useState } from 'react';

enum Estado {
  Lendo,
  ErroLer,
  Lido,
};

const Usuarios2Page = function () {

  const [estado, setEstado] = useState(Estado.ErroLer);

  const conexaoComSucesso = function() {
    setEstado(Estado.Lido);
  };

  const conexaoComErro = function() {
    setEstado(Estado.ErroLer);
  };

  const botaoCarregarClicado = function() {
    setEstado(Estado.Lendo);
    axios.get('http://localhost:4000/api/usuarios')
    .then(conexaoComSucesso)
    .catch(conexaoComErro);
  };

  return (
    <>
      {(estado === Estado.Lendo) && (
        <p>Carregando...</p>
      )}
      
      {(estado === Estado.ErroLer) && (
        <>
          <p>ERRO ao tentar carregar.</p>
          <button onClick={botaoCarregarClicado}>Carregar</button>
        </>
      )}
      
      {(estado === Estado.Lido) && (
        <>
          <h1>Usuários 2</h1>
          <ul>
            <li>Ana</li>
            <li>Breno</li>
            <li>Carla</li>
          </ul>
        </>
      )}
      
    </>
  );
};

export default Usuarios2Page;