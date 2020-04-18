import React from "react";
import ReactDOM from "react-dom";
import "./client/socket/socket.js";
import {App} from "./client/comps/app.jsx";
import "./client/styles/app.sass";
//import store from "./client/redux/redux.js";

console.log("start client script");
ReactDOM.render(
    <App/>
    ,
    document.querySelector('#app')
)


