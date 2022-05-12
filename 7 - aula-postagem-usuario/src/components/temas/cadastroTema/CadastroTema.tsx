import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux';
import { UserState } from '../../../store/user/userReducer';

import { buscaId, post, put } from '../../../services/Service'
import Tema from '../../../models/Tema'

import "./CadastroTema.css"

function CadastroTema() {

    let history = useHistory()

    const { id } = useParams<{ id: string }>()

    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    )

    const [tema, setTema] = useState<Tema>({
        id: 0, 
        descricao: ''
    })

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
            history.push("/login")
        }
    }, [token])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            console.log(tema)
            put(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema atualizado com sucesso');
        } else {
            post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema cadastrado com sucesso');
        }
        back()

    }

    function back() {
        history.push('/temas')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={ onSubmit }>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField
                    value={ tema.descricao }
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    id="descricao" 
                    label="descricao" 
                    variant="outlined" 
                    name="descricao" 
                    margin="normal" 
                    fullWidth 
                />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema