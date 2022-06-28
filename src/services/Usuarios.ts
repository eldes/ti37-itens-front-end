import axios from 'axios';
import Usuario from '../models/Usuario';

const UsuariosService = {
  lerTodos: function (sucesso: (usuarios: Usuario[]) => void, falha: () => void) {
    axios.get<Usuario[]>('http://localhost:4000/api/usuarios')
    .then(function (response) {
      sucesso(response.data);
    })
    .catch(falha);
  },
};

export default UsuariosService;