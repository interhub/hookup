import React,{useState} from "react";
import {Btn} from "./btn.jsx"
import {store} from "../redux/redux.js";
import $ from "JQuery";
import { CLOSING } from "ws";

const login=()=>{
console.log("Loginin in")

}

export const Start_login=(props)=>{
var [state,setState]=useState("login");
if(state=="login"){
return <div className="start_login">
    <h3 className="start_title">Войдите в аккаунт</h3>
    <div className="start_form">
        <input type="text" name="login" placeholder="логин" className="login" /><br />
        <input type="password" name="pass" placeholder="пароль" className="login" />
        <div onClick={()=>{
                login()
                }} >
            <Btn text="Войти"  ></Btn>
        </div>
        <div className="reg_btn" onClick={()=>{
                setState("registr")
                //очистка значений 
                $(".start_form input:not(.fname)").val("")
                }}>
            <Btn text="Регистрация"  ></Btn>
        </div>

    </div>
</div>
}
if(state=="registr"){
return <div className="start_login">
    <h3 className="start_title">Регистрация</h3>
    <div className="start_form">
        <input type="text" name="login" placeholder="имя" className="fname" /><br />
        <input type="text" name="login" placeholder="фамилия" className="sname" /><br />
        <input type="mail" name="login" placeholder="почта" className="mail" /><br />
        <input type="text" name="login" placeholder="город" className="sity" /><br />
        <input type="text" name="login" placeholder="логин" className="login" /><br />
        <input type="password" name="pass" placeholder="пароль" className="login" /><br />
        <input type="password" name="pass" placeholder="пароль повтороно" className="login" />
        <div onClick={()=>{
                login()
                }} >
            <Btn text="Войти"  ></Btn>
        </div>

    </div>
    <div className="start_back" onClick={()=>{
               setState("login")
                }}>
        Назад
    </div>
</div>
}

}