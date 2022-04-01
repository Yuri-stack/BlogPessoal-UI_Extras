import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/static/NavBar/NavBar'
import Footer from './components/static/Footer/Footer';
import ListaTema from './components/temas/listaTema/ListaTema';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <div style={{ minHeight: "100vh" }}>

          <Route exact path="/">
            <Login />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/cadastro">
            <CadastroUsuario />
          </Route>

          <Route path="/temas">
            <ListaTema />
          </Route>

          <Route path="/posts">
            <ListaPostagem />
          </Route>

          <Route exact path='/formularioPostagem'>
            <CadastroPostagem />
          </Route>

          <Route exact path='/formularioPostagem/:id'>
            <CadastroPostagem />
          </Route>

          <Route exact path='/formularioTema'>
            <CadastroTema />
          </Route>

          <Route exact path='/formularioTema/:id'>
            <CadastroTema />
          </Route>

          <Route path='/deletarPostagem/:id'>
            <DeletarPostagem />
          </Route>

          <Route path='/deletarTema/:id'>
            <DeletarTema />
          </Route>

        </div>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
