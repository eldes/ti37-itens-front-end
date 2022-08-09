import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Usuario from '../models/Usuario';

const UsuarioPage = function () {

  const params = useParams();
  const id = params.id;

  const [usuario, setUsuario] = useState<Usuario>();

  const lerUsuarioComSucesso = function(res: AxiosResponse) {
    setUsuario(res.data);
  };

  const lerUsuarioComErro = function() {};

  const htmlRenderizado = function () {
    //TODO: Mostrar indicador de carregamento.
    axios.get<Usuario>(`http://localhost:4000/api/usuarios/${id}`)
    .then(lerUsuarioComSucesso)
    .catch(lerUsuarioComErro);
  };

  useEffect(htmlRenderizado, [id]);

  return (
    <>
      <h1>{id} - {usuario?.nome}</h1>
      <ul>
        <li>Login: {usuario?.login}</li>
        <li>Senha: {usuario?.senha}</li>
      </ul>
      <button>Remover</button>
    </>
  );
};

export default UsuarioPage;