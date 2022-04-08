import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux';
import { UserState } from '../../../store/user/userReducer';

import { busca, buscaId, post, put } from '../../../services/Service';
import Tema from '../../../models/Tema'
import Postagem from '../../../models/Postagem'
import User from '../../../models/User';

import './CadastroPostagem.css'

function CadastroPostagem() {

    let history = useHistory()

    const { id } = useParams<{ id: string }>()

    const [temas, setTemas] = useState<Tema[]>([])

    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    )

    // Pega o ID guardado no Store
    const userId = useSelector<UserState, UserState["id"]>(
        (state) => state.id
    );

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        tema: null,
        usuario: null
    })

    const [user, setUser] = useState<User>({
        id: +userId,    // Faz uma conversão de String para Number
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
            history.push("/login")
        }
    }, [token])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== '') {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: user
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {

            try {
                await put(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })

                alert('Postagem atualizada com sucesso');

            } catch (error) {
                console.log(`Error: ${error}`)
                alert('Ops, algo deu errado. Tente novamente');
            }

        } else {

            try {
                await post(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })

                alert('Postagem cadastrada com sucesso');
                
            } catch (error) {
                console.log("Error: " + error)
                alert('Ops, algo deu errado. Tente novamente');
            }
            
        }
        back()
    }

    function back() {
        history.push('/posts')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>

                <TextField
                    value={postagem.titulo}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
                    id="titulo" label="titulo" variant="outlined"
                    name="titulo" margin="normal" fullWidth
                />

                <TextField
                    value={postagem.texto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
                    id="texto" label="texto" name="texto" variant="outlined"
                    margin="normal" fullWidth
                />

                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>

                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"

                        onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}
                    >

                        {
                            temas.map(item => (
                                <MenuItem value={item.id}>{item.descricao}</MenuItem>
                            ))
                        }

                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default CadastroPostagem