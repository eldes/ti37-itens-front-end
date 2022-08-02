import { Link } from 'react-router-dom';

const HomePage = function () {
  return (
    <>
      <h1>Homepage</h1>
      <nav>
        <Link to='/usuarios'>Usuários</Link>
      </nav>
    </>
  );
};

export default HomePage;