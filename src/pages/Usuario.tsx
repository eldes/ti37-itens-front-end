import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Usuario from '../models/Usuario';
import Api from '../services/Api';

const UsuarioPage = function () {

  const params = useParams();
  const id = params.id;

  const [usuario, setUsuario] = useState<Usuario>();
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [estaEditando, setEstaEditando] = useState(false);
  const [status, setStatus] = useState(200);
  const [novoNome, setNovoNome] = useState('');
  const [novoLogin, setNovoLogin] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const navigate = useNavigate();

  const lerUsuarioComSucesso = function(res: AxiosResponse) {
    setEstaCarregando(false);
    setStatus(res.status);
    setUsuario(res.data);
  };

  const lerUsuarioComErro = function(error: AxiosError) {
    setEstaCarregando(false);
    if (error.response) {
      setStatus(error.response.status);
    }
  };

  const removerUsuarioComSucesso = function (res: AxiosResponse) {
    setEstaCarregando(false);
    if (res.status === 204) {
      navigate('/usuarios');
    } else {
      setStatus(res.status);
    }
  };

  const removerUsuarioComErro = function (error: AxiosError) {
    setEstaCarregando(false);
    if (error.response) {
      setStatus(error.response.status);
    }
  };

  const botaoRemoverClicado = function () {
    setEstaCarregando(true);
    Api.delete(`/usuarios/${usuario?.id}`)
    .then(removerUsuarioComSucesso)
    .catch(removerUsuarioComErro);
  };

  const botaoEditarClicado = function () {
    if (usuario) {
      setNovoNome(usuario.nome);
      setNovoLogin(usuario.login);
      setNovaSenha(usuario.senha);
    }
    setEstaEditando(true);
  };

  const editarUsuarioComSucesso = function (res: AxiosResponse) {
    setEstaCarregando(false);
    if (res.status === 204) {
      setUsuario({
        id: usuario?.id,
        nome: novoNome,
        login: novoLogin,
        senha: novaSenha,
      });
      setEstaEditando(false);
    }
    setStatus(res.status);
  };

  const editarUsuarioComErro = function (error: AxiosError) {
    setEstaCarregando(false);
    if (error.response) {
      setStatus(error.response.status);
    }
  };
  
  const botaoSalvarClicado = function () {
    setEstaCarregando(true);
    const novoUsuario = {
      nome: novoNome,
      login: novoLogin,
      senha: novaSenha,
    };
    Api.put(`/usuarios/${usuario?.id}`, novoUsuario)
    .then(editarUsuarioComSucesso)
    .catch(editarUsuarioComErro);
  };

  const botaoCancelarClicado = function () {
    setEstaEditando(false);
  };

  const htmlRenderizado = function () {
    setEstaCarregando(true);
    Api.get<Usuario>(`/usuarios/${id}`)
    .then(lerUsuarioComSucesso)
    .catch(lerUsuarioComErro);
  };

  useEffect(htmlRenderizado, [id]);

  return (
    <>
      {(estaCarregando) && (
        <p>Carregando...</p>
      )}
      
      {(status !== 200) && (
        <p>ERRO ao tentar carregar.</p>
      )}

      {(status === 404) && (
        <p>Usuário não cadastrado</p>
      )}

      {(status === 204) && (
        <p>SUCESSO ao salvar.</p>
      )}

      {(((status === 200) || (status === 204)) && (!estaEditando)) && (
        <>
          <h1>{id} - {usuario?.nome}</h1>
          <ul>
            <li>Login: {usuario?.login}</li>
            <li>Senha: {usuario?.senha}</li>
          </ul>
          {(usuario) && (
            <>
              <Button label='Editar' onClick={botaoEditarClicado} />
              <button onClick={botaoRemoverClicado}>Remover</button>
            </>
          )}
        </>
      )}

      {(estaEditando) && (
        <form>
          <div>
            <input
              placeholder='Nome'
              value={novoNome}
              onChange={function(e) {
                setNovoNome(e.target.value)
              }}
            />
            <input
              placeholder='Login'
              value={novoLogin}
              onChange={function(e) {
                setNovoLogin(e.target.value)
              }}
            />
            <input
              placeholder='Senha'
              value={novaSenha}
              onChange={function(e) {
                setNovaSenha(e.target.value)
              }}
            />
          </div>
          <div>
            <button type='button' onClick={botaoSalvarClicado}>Salvar</button>
            <button type='button' onClick={botaoCancelarClicado}>Cancelar</button>
          </div>
        </form>
      )}
      
    </>
  );
};

export default UsuarioPage;