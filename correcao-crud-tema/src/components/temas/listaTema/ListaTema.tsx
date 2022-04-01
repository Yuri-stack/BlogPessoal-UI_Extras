import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'

import Tema from '../../../models/Tema'
import { busca } from '../../../services/Service'

import './ListaTema.css'

function ListaTema() {

  let history = useHistory()

  const [temas, setTemas] = useState<Tema[]>([])

  const [token, setToken] = useLocalStorage('token')

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado")
      history.push("/login")
    }
  }, [token])

  async function getTema() {
    await busca("/temas", setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getTema()
  }, [temas.length])

  return (
    <>
      {
        temas.map(tema => (
          <Box m={2} >
            <Card variant="outlined">
              <CardContent>

                <Typography color="textSecondary" gutterBottom>
                  Tema
                </Typography>

                <Typography variant="h5" component="h2">
                  { tema.descricao }
                </Typography>

              </CardContent>

              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5} >

                  <Link to={`/formularioTema/${ tema.id }`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft" size='small' color="primary" >
                        Atualizar
                      </Button>
                    </Box>
                  </Link>

                  <Link to={`/deletarTema/${ tema.id }`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary">
                        Deletar
                      </Button>
                    </Box>
                  </Link>

                </Box>
              </CardActions>

            </Card>
          </Box>
        ))}
    </>
  )
}

export default ListaTema