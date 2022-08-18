import { Button } from '@material/react-button';
import { Fab } from '@material/react-fab';
import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { AxiosResponse } from 'axios';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from '../App.module.css';
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
      <Link key={usuario.id} to={`/usuario/${usuario.id}`}>
        <ListItem className={styles.mdcListItem}>
          <ListItemText className={styles.mdcListItemText} primaryText={usuario.nome}/>
          <ListItemGraphic className={styles.mdcListItemGraphic} graphic={<MdChevronRight />} />
        </ListItem>
      </Link>
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
          <List className={styles.mdcList}>
            {usuarios.map(geraLi)}
          </List>
        </>
      )}
      
      {((estado === Estado.Lido) || (estado === Estado.Criado)) && (
        <Fab
          onClick={botaoNovoUsuarioClicado}
          icon={<MdAdd/>}
          className={styles.mdcFab}
        />
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
            <TextField
              label='Nome'
              helperText={<HelperText>Seu nome completo</HelperText>}
            >
              <Input onChange={ function (e:FormEvent<HTMLInputElement>) {setNome(e.currentTarget.value)} } value={nome}/>
            </TextField>
            <TextField
              label='Login'
              helperText={<HelperText>Seu nome de usuário</HelperText>}
            >
              <Input placeholder='Login'  onChange={ function (e:FormEvent<HTMLInputElement>) {setLogin(e.currentTarget.value)} } value={login} />
            </TextField>
            <TextField
              label='Senha'
              helperText={<HelperText>Sua senha</HelperText>}
            >
              <Input placeholder='Senha' type='password' onChange={ function (e:FormEvent<HTMLInputElement>) {setSenha(e.currentTarget.value)} } value={senha}/>
            </TextField>
          </div>
          <div>
            <Button outlined onClick={botaoSalvarClicado}>Salvar</Button>
            <Button onClick={botaoCancelarClicado}>Cancelar</Button>
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