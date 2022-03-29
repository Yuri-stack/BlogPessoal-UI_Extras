import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/static/NavBar/NavBar'
import Footer from './components/static/Footer/Footer';
import ListaTema from './components/temas/listaTema/ListaTema';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario';

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
        
      </div>
    </Switch>
    <Footer />
  </Router>
  );
}

export default App;
