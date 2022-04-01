interface Tema{
    id: number
    descricao: string
    postagem?: [{}] // Add esse campo, criando um campo de Postagem, sendo iniciado como um Array de Obj. vazio
}

export default Tema