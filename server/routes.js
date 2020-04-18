module.exports = (app) => {
    const MongoClient = require("mongodb").MongoClient;
    const address = require("./address.js");
    const {createServer} =require('http');
    const WebSocket = require("ws");
    const expressWs = require("express-ws")(app);
    ///////
    // const server=createServer(app);
    // const wsServer=new WebSocket({server});


////
    MongoClient.connect(address, (err, db) => {
        if (err) {
            console.error(err, "ERR MY CONNECT TO DB");
        }
        console.log("CONNECT TO DB IS SUCCESS ♥")
        const client = db;
        app.ws("/", (ws, req) => {
            ws.on("error", () => {
                ws.close()
            })
            console.log("CONNECT TO WS");
            ws.send("HELLO USER ");
                ws.on("message", (msg) => {
                    console.log("WS NEW MESSAGE: ", msg)
                    expressWs.getWss().clients.forEach(us=>{
                        us.send(msg)
                    })
                })

        })

        // wsServer.on("connection",(ws)=>{
        //     ws.send("HEllo User!!!!!")
        // })

        app.get('/', (req, res) => {
            res.sendFile(process.cwd() + "/index.html")
            console.log("PAGE IS LOAD +");
        })

        app.get("*", (req, res) => res.sendFile(process.cwd() + req.url))
    })

}