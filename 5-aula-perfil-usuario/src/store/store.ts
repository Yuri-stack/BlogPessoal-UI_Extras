import { createStore } from "redux";
import { userReducer } from "./tokens/userReducer";

const store = createStore(userReducer)

export default store 
