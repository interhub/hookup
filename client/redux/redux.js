import {createStore} from "redux";

const state={
    logined: false,
    user:{}
};

const reduser=(state,action)=>{
    switch(action.type){
        case "LOGIN": return {...state,logined:true}
    }
}

export const store=createStore(reduser);