import { Action } from './action';

// Altere a Interface de TokenState para UserState, e adicione o campo ID
export interface UserState {
    tokens: string,
    id: string,
}

// Altere a Inicialiazação do State adicionando o campo ID
const initialState = {
    tokens: "",
    id: ""
}

// Mude TokenState para UserState
export const userReducer = (state: UserState = initialState, action: Action) =>{
    switch (action.type){
        case "ADD_TOKEN": {
            
            /* Seguindo a Interface UserState, retornamos o Token com a informação adicionada e o 
                ID com a informação inicial dele*/
            return {tokens: action.payload, id: state.id}
        }
        case "ADD_ID": {

            /* Seguindo a Interface UserState, retornamos o ID com a informação adicionada e o 
                Token com a informação inicial dele*/
            return {id: action.payload, tokens: state.tokens}
        }

        default:
            return state
    }
}