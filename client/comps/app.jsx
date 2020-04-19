import React,{useState} from "react";
import {Loader} from "./loader.jsx";
import {Start_login} from "./start_login.jsx";
import store from "../redux/redux.js";
import {User_page} from "./user_page.jsx";


export const App =(props)=>{
    //состояние загрузки 
var [loading,setLoad]=useState(false);

    //состояние авторизации
var [logined,setLogin]=useState(store.getState().logined);

store.subscribe(()=>{
    setLoad(store.getState().loading)
    setLogin(store.getState().logined)
})

if(loading){
return <div className="load_box">
    <Loader />
</div>
}
if(!loading&&!logined){
return <Start_login />
}
if(logined){
    return <User_page/>
}
}