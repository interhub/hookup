import {createStore} from "redux";

var state={
    logined: false,
    user:{},
    loading: false
};

const reduser=(state, action)=>{
    switch(action.type){
        case "LOGIN": console.log("Login act");  return {...state, logined:action.logined };break;
        case "LOADING": console.log("Loading change");  return {...state,loading:action.loading };break;
        default: console.log("Не известное действие Redux"); return {...state};
    }
}
 var store=createStore(reduser, state);
 export default store;