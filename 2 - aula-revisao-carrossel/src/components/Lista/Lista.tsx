import React from 'react'

function Lista() {

  /*
    Criamos um Array/Vetor chamado prog, que dentro dele existe 4 Objetos.
    Cada objeto possui um campo name, sendo que seu valor é uma tecnologia.
  */
  var prog = [
    { name: "Html" },
    { name: "CSS" },
    { name: "Java" },
    { name: "Typescript" }
  ]

  return (

    /*
      Função Map: para cada Objeto/Item/Elemento de um Array/Vetor, o Map vai executar uma função e retornar
                  um resultado. Nesse caso, para cada item do Array, criamos um H1 e colocamos dentro dele 
                  o valor do campo name
    */

    <>
      {
        prog.map(function(item){
          return(
            <h1>{ item.name }</h1>
          )
        })
      }
    </>

  )
}

export default Lista