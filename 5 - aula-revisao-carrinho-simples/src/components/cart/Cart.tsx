import React, { useEffect, useState, ChangeEvent } from 'react'
import { Box, Button, Card, TextField, Typography } from '@material-ui/core'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Produto from '../../models/Produto'
import { buscaId } from '../../services/Service'
import useLocalStorage from 'react-use-localstorage'

import './Cart.css'

function Cart() {

    let history = useNavigate()

    const { id } = useParams<{ id: string }>()

    const [token, setToken] = useLocalStorage("token")

    const [quantidadeFinal, setQuantidadeFinal] = useState(0)

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nome: "Hortaliças",
        preco: 8.50,
        quantidade: 10,
        imagem: "https://www.paversul.com.br/wp-content/uploads/2019/03/o-que-vender-em-loja-de-produtos-naturais-facebook.jpg"
    })

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
            history("/login")
        }
    }, [token])

    // useEffect(() => {
    //     if (id !== undefined) {
    //         findByIdPostagem(id)
    //     }
    // }, [id])

    // async function findByIdPostagem(id: string) {
    //     await buscaId(`postagens/${id}`, setProduto, {
    //         headers: {
    //             'Authorization': token
    //         }
    //     })
    // }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let valor = +e.target.value
        setQuantidadeFinal(valor);
    }

    function valorTotal() {
        return quantidadeFinal * produto.preco
    }

    function confirmSales() {
        alert("Compra Confirmada! Verifique o seu email!")
        history("/posts")
    }

    return (
        <>
            <Box m={2} display="flex" justifyContent="center">
                <Card variant="outlined" className='cardContainer'>

                    <div className='cardProduct'>
                        <img src={produto.imagem} alt="Img" />

                        <div className='cardProductInfo'>
                            <Typography color="textSecondary" gutterBottom>
                                Postagens
                            </Typography>

                            <Typography variant="h5" component="h2">
                                {produto.nome}
                            </Typography>

                            <Typography variant="body2" component="p">
                                R$ {produto.preco}
                            </Typography>

                            <Typography variant="body2" component="p">
                                Quantidade Máx: {produto.quantidade}
                            </Typography>

                            <TextField
                                value={quantidadeFinal}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                InputProps={{ inputProps: { min: 1, max: produto.quantidade } }}
                                id="quantidade" label="quantidade" type="number" variant="outlined"
                                name="quantidade" margin="normal" fullWidth
                            />

                            <Typography variant="body2" component="p">
                                Total: R$ {valorTotal()}
                            </Typography>
                        </div>
                    </div>

                </Card>

                <Box display="flex" flexDirection="column" justifyContent="center" mb={1.5}>

                    <Box className="cardProductButton">
                        <Box mx={1}>
                            <Button onClick={confirmSales} variant="contained" size='small' color="primary">
                                Confimar Compra
                            </Button>
                        </Box>
                    </Box>

                    <Link to="/posts" className="cardProductButton">
                        <Box mx={1}>
                            <Button variant="contained" size='small' color="secondary">
                                Cancelar
                            </Button>
                        </Box>
                    </Link>

                </Box>
            </Box>
        </>
    )
}

export default Cart