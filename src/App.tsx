import '@material/react-button/dist/button.min.css';
import '@material/react-fab/dist/fab.min.css';
import '@material/react-list/dist/list.min.css';
import '@material/react-text-field/dist/text-field.min.css';
import TopAppBar, { TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@material/react-top-app-bar';
import '@material/react-top-app-bar/dist/top-app-bar.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import HomePage from './pages/Home';
import UsuarioPage from './pages/Usuario';
import UsuariosPage from './pages/Usuarios';

const App = function () {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <TopAppBar fixed>
          <TopAppBarRow>
            <TopAppBarSection>
              <TopAppBarTitle>Usuários</TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <main className={styles.page}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/usuarios' element={<UsuariosPage />} />
            <Route path='/usuario/:id' element={<UsuarioPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
