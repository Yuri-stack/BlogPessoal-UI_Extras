import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store/store';

import Navbar from './components/static/Navbar/Navbar';
import Footer from './components/static/Footer/Footer';
import ListaTema from './components/temas/listaTema/ListaTema';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './components/temas/deletarTema/DeletarTema';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario';
import Perfil from './pages/Perfil/Perfil';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <div style={{ minHeight: '100vh' }}>

          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/login" element={<Login />} />

            <Route path="/home" element={<Home />} />

            <Route path="/cadastro" element={<CadastroUsuario />} />

            <Route path="/temas" element={<ListaTema />} />

            <Route path="/posts" element={<ListaPostagem />} />

            <Route path="/formularioPostagem" element={<CadastroPostagem />} />

            <Route path="/formularioPostagem/:id" element={<CadastroPostagem />} />

            <Route path="/formularioTema" element={<CadastroTema />} />

            <Route path="/formularioTema/:id" element={<CadastroTema />} />

            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />

            <Route path="/deletarTema/:id" element={<DeletarTema />} />

            <Route path='/perfil' element={<Perfil />} />

          </Routes>

        </div>

        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
