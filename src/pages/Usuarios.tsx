import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import FAB from '../components/FAB';
import Usuario from '../models/Usuario';
import Api from '../services/Api';

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

  const [estado, setEstado] = useState(Estado.Lendo);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const geraLi = function(usuario: Usuario) {
    return (
      <li key={usuario.id}>
        <Link to={`/usuario/${usuario.id}`}>
          {usuario.nome}
        </Link>
      </li> 
    );
  };

  const conexaoComSucesso = function(res: AxiosResponse) {
    setUsuarios(res.data);
    setEstado(Estado.Lido);
  };

  const conexaoComErro = function() {
    setEstado(Estado.ErroLer);
  };

  const carregar = useCallback(function () {
    setEstado(Estado.Lendo);
    Api.get('/usuarios')
    .then(conexaoComSucesso)
    .catch(conexaoComErro);
  }, []);

  const botaoCarregarClicado = function() {
    carregar();
  };

  const botaoNovoUsuarioClicado = function() {
    setEstado(Estado.Criar);
  };

  const botaoSalvarClicado = function() {
    setEstado(Estado.Salvando);

    const novoUsuario: Usuario = {
      nome,
      login,
      senha,
    };

    const lerNovoUsuarioComSucesso = function (res: AxiosResponse) {
      const usuario = res.data;
      usuarios.push(usuario);
      setEstado(Estado.Criado);
    };
    
    const lerNovoUsuarioComErro = function () {
      setEstado(Estado.ErroLer);
    };

    const criarComSucesso = function (res: AxiosResponse) {
      const endpoint = res.headers.location;
      Api.get<Usuario>(endpoint)
      .then(lerNovoUsuarioComSucesso)
      .catch(lerNovoUsuarioComErro);
    };

    const criarComErro = function () {
      setEstado(Estado.ErroCriar);
    };

    Api.post('/usuarios', novoUsuario)
    .then(criarComSucesso)
    .catch(criarComErro);
  };

  const botaoCancelarClicado = function() {
    setEstado(Estado.Lido);
  };

  const htmlRenderizado = function () {
    carregar();
  };

  useEffect(htmlRenderizado, [carregar]);

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
        <FAB onClick={botaoNovoUsuarioClicado}>
          <MdAdd />
        </FAB>
      )}

      {(estado === Estado.Criado) && (
        <p>SUCESSO em criar novo usuário.</p>
      )}

      {(estado === Estado.ErroCriar) && (
        <p>ERRO ao tentar salvar.</p>
      )}
      
      {((estado === Estado.Criar) || (estado === Estado.ErroCriar)) && (
        <form>
          <div>
            <input placeholder='Nome' onChange={ function (e) {setNome(e.target.value)} } />
            <input placeholder='Login'  onChange={ function (e) {setLogin(e.target.value)} } />
            <input placeholder='Senha' type='password'  onChange={ function (e) {setSenha(e.target.value)} } />
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