import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import Usuario from '../models/Usuario';

enum Estado {
  Lendo,
  ErroLer,
  Lido,
};

const UsuariosPage = function () {

  const [estado, setEstado] = useState(Estado.ErroLer);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const geraLi = function(usuario: Usuario) {
    return (
      <li>{ usuario.nome }</li>
    );
  };

  const conexaoComSucesso = function(res: AxiosResponse) {
    setUsuarios(res.data);
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
          <h1>Usuários</h1>
          <ul>
            {usuarios.map(geraLi)}
          </ul>
        </>
      )}
      
    </>
  );
};

export default UsuariosPage;