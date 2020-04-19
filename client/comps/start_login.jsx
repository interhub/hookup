import React,{useState} from "react";
import {Btn} from "./btn.jsx"
import store from "../redux/redux.js";
import {dialog} from "./dialog.js";
import $ from "JQuery";
import {Loader} from "./loader.jsx";
import {ws} from "../socket/socket.js";
//import { CLOSING } from "ws";

const login=(setState)=>{
let obj={};
for(var i=0;i<2;i++){
    let txt=$(".start_form input").eq(i).val();
    switch(i){
        case 0:obj.login=txt;
        case 1:obj.pass=txt;
    }
}
    ws.send("#login/"+JSON.stringify(obj));
    //создание запроса на вход 
    let bool=true;
    ws.addEventListener("message",(e)=>{
        if(bool){
            bool=false;
        store.dispatch({
            type:"LOADING",
            loading: false
        })
    }
    //условие выдачи уведомления
    if(e.data.includes("#ERR/")){
        console.log("PASS NOT")
        return dialog(e.data.replace(/^\#ERR\//,""))
    }

    let txt=e.data
    if(/\{/.test(txt)){
    var msg=JSON.parse(txt);
    
    if((typeof msg.key)=="number"){
        console.log("YOU",msg)
        localStorage.setItem("key",msg.key);
        localStorage.logined=true;
        localStorage.setItem("user", txt)
        console.log("key is SET")
       return store.dispatch({
            type: "LOGIN",
            user: msg,
            logined:true
        })
    }}
    

    })
    store.dispatch({
        type:"LOADING",
        loading:true
    })

}
const registr=(setState)=>{
    let obj={};
    for(var i=0;i<7;i++){
        let txt=$(".start_form input").eq(i).val();
        switch(i){
            case 0:obj.fname=txt;break;
            case 1:obj.sname=txt;break;
            case 2:obj.mail=txt;break;
            case 3:obj.sity=txt;break;
            case 4:obj.login=txt;break;
            case 5:obj.pass=txt;break;
        }

        if($(".start_form input").eq(i).val()==""){
            return dialog("Заполните все поля")
        }
        if(i==6){
            if(!/.(ru|com|su|org|io)$/.test($(".start_form input").eq(2).val())){
                return dialog("Введите корректный почтовый адрес")
             }
            if($(".start_form input").eq(5).val()!=$(".start_form input").eq(6).val()){
                return dialog("Пароли не совпадают")
            }
            let bool=true;
            //создание запроса на регистсрацию 
            ws.addEventListener("message",(e)=>{
                if(bool){
                dialog(e.data)
                store.dispatch({
                    type:"LOADING",
                    loading: false
                })
            }
            bool=false;
            })
            ws.send("#registr/"+JSON.stringify(obj))
            store.dispatch({
                type:"LOADING",
                loading: true
            })
        }
    }
    
}

export const Start_login=(props)=>{
var [state,setState]=useState("login");
if(state=="login"){
return <div className="start_login">
    <h3 className="start_title">Войдите в аккаунт</h3>
    <div className="start_form">
        <input type="text" name="login" placeholder="логин" id="login" className="login" /><br />
        <input type="password" name="pass" placeholder="пароль" id="pass" className="login" />
        <div onClick={()=>{
                login(setState)
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
                registr(setState)
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
if(state="load"){
    return <div className="load_box">
        <Loader/>
    </div>
}

}