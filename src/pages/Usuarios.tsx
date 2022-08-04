import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import FAB from '../components/FAB';
import Usuario from '../models/Usuario';

enum Estado {
  Lendo,
  ErroLer,
  Lido,
  Criar,
  Salvando,
  Criado,
  ErroCriar,
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

  const botaoNovoUsuarioClicado = function() {
    setEstado(Estado.Criar);
  };

  const botaoSalvarClicado = function() {
    setEstado(Estado.Salvando);
    //TODO: Conectar no back-end
    setEstado(Estado.Criado);
  };

  const botaoCancelarClicado = function() {
    setEstado(Estado.Lido);
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
      
      {((estado === Estado.Lido) || (estado === Estado.Criar) || (estado === Estado.Salvando) || (estado === Estado.Criado)) && (
        <>
          <h1>Usuários</h1>
          <ul>
            {usuarios.map(geraLi)}
          </ul>
        </>
      )}
      
      {((estado === Estado.Lido) || (estado === Estado.Criado)) && (
        <FAB onClick={botaoNovoUsuarioClicado} text='Novo usuário' />
      )}

      {(estado === Estado.Criado) && (
        <p>SUCESSO em criar novo usuário.</p>
      )}

      {(estado === Estado.ErroCriar) && (
        <p>ERRO ao tentar salvar.</p>
      )}
      
      {(estado === Estado.Criar) && (
        <form>
          <div>
            <input placeholder='Nome' />
            <input placeholder='Login' />
            <input placeholder='Senha' type='password' />
          </div>
          <div>
            <button onClick={botaoSalvarClicado}>Salvar</button>
            <button onClick={botaoCancelarClicado}>Cancelar</button>
          </div>
        </form>
      )}
      
      {(estado === Estado.Salvando) && (
        <p>Salvando...</p>
      )}
    </>
  );
};

export default UsuariosPage;