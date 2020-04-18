import {dialog} from "../comps/dialog.js";
export const ws = new WebSocket("ws://" + location.host + "/")
var wsSend = function(data) {
    if(!ws.readyState){
        setTimeout(function (){
            wsSend(data);
            console.log("reload");
        },500);
    }else{
        ws.send(data);
    }
};
//wsSend("Hello");

ws.onopen = () => {
    var i = 0
    console.log("CONNECT WS IS OPEN")
    
}
ws.onerror=(err)=>{
    console.log(err,"my err");
}
console.log("SOCKET location:", location.host, ws)
// ws.onmessage = (res) => {
//     console.log("RESPONSE WS:", res.data)
//     //использование данных data

// }
ws.onclose=()=>{
    dialog("Соединение с сервером поотеряно, обновите страницу",true);
// получение статуса оффлайн 

}


