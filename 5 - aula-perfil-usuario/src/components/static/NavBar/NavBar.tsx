import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/userReducer';
import { addToken } from '../../../store/tokens/action';

import './NavBar.css'

function NavBar() {

    let history = useHistory()

    const dispatch = useDispatch()

    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    )

    function goLogout() {
        dispatch(addToken(''))
        alert("Usuário deslogado")
        history.push("/login")
    }

    var navBarComponent

    if (token !== "") {
        navBarComponent =
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Box className='cursor'>
                        <Typography variant="h5" color="inherit">
                            BlogPessoal
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="start">
                        <Link to="/home" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    Home
                                </Typography>
                            </Box>
                        </Link>

                        <Link to="/posts" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    Postagens
                                </Typography>
                            </Box>
                        </Link>

                        <Link to="/temas" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    Temas
                                </Typography>
                            </Box>
                        </Link>

                        <Link to="/formularioTema" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    Cadastrar Temas
                                </Typography>
                            </Box>
                        </Link>

                        <Link to="/perfil" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    Perfil
                                </Typography>
                            </Box>
                        </Link>

                        <Box mx={1} className='cursor' onClick={goLogout}>
                            <Typography variant="h6" color="inherit">
                                Logout
                            </Typography>
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>
    }

    return (
        <>
            { navBarComponent }
        </>
    )
}

export default NavBar