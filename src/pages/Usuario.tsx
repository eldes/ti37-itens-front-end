import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Usuario from '../models/Usuario';

const UsuarioPage = function () {

  const params = useParams();
  const id = params.id;

  const [usuario, setUsuario] = useState<Usuario>();
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [status, setStatus] = useState(200);

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

  const htmlRenderizado = function () {
    setEstaCarregando(true);
    axios.get<Usuario>(`http://localhost:4000/api/usuarios/${id}`)
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

      {(status === 200) && (
        <>
          <h1>{id} - {usuario?.nome}</h1>
          <ul>
            <li>Login: {usuario?.login}</li>
            <li>Senha: {usuario?.senha}</li>
          </ul>
          <button>Remover</button>
        </>
      )}
    </>
  );
};

export default UsuarioPage;