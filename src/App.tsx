import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import UsuariosPage from './pages/Usuarios';

const App = function () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/usuarios' element={<UsuariosPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
