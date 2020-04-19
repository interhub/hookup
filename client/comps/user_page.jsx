import React,{useState} from "react";
import {Loader} from "./loader.jsx";
import store from "../redux/redux.js";


export const User_page=(props)=>{
let user=store.getState().user

    return <div className="user_page">
        <div className="my_page">
        <button className="btn_app out_btn" onClick={()=>{
            localStorage.clear()
            window.location=location;
        }} >Выйти</button>
        <div className="user_info">
            <div className="user_info_top">
                <div className="avata_box">
                    <img src={location.origin+`${user.avatar==""?"/client/imgs/user.jpg":user.avatar}`} alt={user.fname} className="avatar_img" />
                </div>
                <div className="info_header">
    <h1 className="info_name">{user.fname} {user.sname}</h1>
    <p className="info_contacts">
        почта: {user.mail}<br/>
        город: {user.sity}
    </p>
                </div>
            </div>
            <div className="user_info_down">
                <ul className="info_items">
                    <li>Сообщения</li>
                    <li>Друзья</li>
                    <li>Найти друзей</li>
                    <li>Информация о приложении</li>

                </ul>
            </div>
        </div>
        </div>
    </div>
}