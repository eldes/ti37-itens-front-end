import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import UsuariosPage from './pages/Usuarios';
import Usuarios2Page from './pages/Usuarios2';

const App = function () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/usuarios' element={<Usuarios2Page />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
