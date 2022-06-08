import React, { useEffect, useState, ChangeEvent } from 'react'
import { Box, Button, Card, TextField, Typography } from '@material-ui/core'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Produto from '../../models/Produto'
import { buscaId } from '../../services/Service'
import useLocalStorage from 'react-use-localstorage'

import './Cart.css'

function Cart() {

    let history = useNavigate()

    // Assim como no FormularioPostagem, pegamos o Id do Produto pela URL
    const { id } = useParams<{ id: string }>()

    // Substituir para o uso com Redux
    const [token, setToken] = useLocalStorage("token")

    // State para guardar a quantidade escolhida pela P. Usuaria 
    const [quantidadeFinal, setQuantidadeFinal] = useState(0)

    // State para guardar as informações do Produto retornadas pelo Back
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

    
    // Vai disparar a função findByIdProduto sempre que o ID for diferente que Undefined
    useEffect(() => {
        if (id !== undefined) {
            findByIdProduto(id)
        }
    }, [id])

    // Esse Código irá pegar o ID do Produto, e acessar a service que busca as informações por ID 
    async function findByIdProduto(id: string) {
        await buscaId(`produtos/${id}`, setProduto, {
            headers: {
                'Authorization': token
            }
        })
    }

    // Função que vai pegar a quantidade escolhida do Produto
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let valor = +e.target.value
        setQuantidadeFinal(valor);
    }

    // Função que mostra o valor total entre a quantidade e o valor unitário do item. Ex.: 2 * R$2 = 4
    function valorTotal() {
        return quantidadeFinal * produto.preco
    }

    // Função que simula a compra Efetuada com sucesso
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

                                // Propriedade que define o limite minimo e máximo de itens que podem ser comprados
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