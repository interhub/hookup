import React,{useState} from "react";
import {Loader} from "./loader.jsx";
import {Start_login} from "./start_login.jsx";
import store from "../redux/redux.js";



export const App =(props)=>{
var [loading,setLoad]=useState(false);
store.subscribe(()=>{
    setLoad(store.getState().loading)
})

if(loading){
return <div className="load_box">
    <Loader />
</div>
}else{
return <Start_login />
}
}