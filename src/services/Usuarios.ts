import Usuario from '../models/Usuario';

const UsuariosService = {
  lerTodos: function (sucesso: (usuarios: Usuario[]) => void, falha: () => void) {
    sucesso([]);
  },
};

export default UsuariosService;