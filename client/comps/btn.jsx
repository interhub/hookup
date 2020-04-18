import React,{useState} from "react";

export const Btn=(props)=>{
    return <div className="btn_app_box">
        <button className="btn_app">{props.text}</button>
    </div>
}