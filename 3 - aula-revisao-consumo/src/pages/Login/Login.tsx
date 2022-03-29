import React, { ChangeEvent, useState, useEffect } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';

import './Login.css';

function Login() {

    // redireciona o usuário para determinada pagina
    let history = useHistory()

    // hooks que vão manipular o nosso Local Storage para gravar o Token
    const [token, setToken] = useLocalStorage('token')

    // useState define como uma determinada variavel será inicializada quando o Comp. for renderizado
    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    useEffect(() => {
        if(token !== ""){
            history.push('/home')
        }
    }, [token])

    // função que junto com a setUserLogin irá atualizar o valor inicial da userLogin
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value           
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()

        try {
            await login(`/usuarios/logar`, userLogin, setToken)
            alert("Usuário logado com sucesso")

        } catch (error) {
            alert("Dados do usuário inconsistentes")
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>

                    <form onSubmit={ onSubmit }>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>

                        <TextField value={ userLogin.usuario } onChange={ (e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={ userLogin.senha } onChange={ (e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />

                        <Box marginTop={2} textAlign='center'>

                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>

                        </Box>
                    </form>

                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastro'>
                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                        </Link>
                    </Box>

                </Box>
            </Grid>
            <Grid xs={6} className='imagem'>

            </Grid>
        </Grid>
    )
}

export default Login