import React from "react";
import ReactDOM from "react-dom";
import "./client/socket/socket.js";
import {App} from "./client/comps/app.jsx";
import "./client/styles/app.sass";
console.log("start client script");
ReactDOM.render(
    <App/>
    ,
    document.querySelector('#app')
)


