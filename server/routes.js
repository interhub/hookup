module.exports = (app) => {
    const MongoClient = require("mongodb").MongoClient;
    const address = require("./address.js");
    const {
        createServer
    } = require('http');
    const WebSocket = require("ws");
    const expressWs = require("express-ws")(app);

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
                //условие оработки роута сокета
                switch (msg.replace(/\/.*/, "")) {
                    case "#registr":
                        console.log("REGISTR");

                        var newuser = JSON.parse(msg.replace("#registr/", ""));

                        client.db("hookup").collection("users").find({
                            login: newuser.login
                        }).toArray((err, result) => {
                            if (err) {
                                ws.send("Ошибка сервера");
                                return console.log(err, "my registr error 1 (find)")
                            }
                            if(result.length==0){
                                //делаем запрос на получение нового уникального id заносим в обьект и добавляем в колекцию юзеров
                                setTimeout(()=>{client.db("hookup").collection("maxkey").update({maxkey:{$ne:-1}},{$inc:{maxkey:1}},(err,result)=>{
                                    if (err) {
                                        ws.send("Ошибка сервера");
                                        return console.log(err, "my registr error 2 (update)")
                                    }
                                    console.log("Update max id success")//ключ обновлен далее получаем
                                    client.db("hookup").collection("maxkey").findOne({},(err,result)=>{
                                        if (err) {
                                            ws.send("Ошибка сервера");
                                            return console.log(err, "my registr error 3 (get new key)")
                                        }
                                        var key=result.maxkey;
                                        console.log(key,"new key");
                                        newuser.key=key;
                                        newuser.dialogs=[];
                                        newuser.friends=[];
                                        newuser.ID=key;
                                        newuser.avatar="";
                                        //добавление нового пользователя в базу
                                        client.db("hookup").collection("users").insert(newuser,(err,result)=>{
                                        if (err) {
                                            ws.send("Ошибка сервера");
                                            return console.log(err, "my registr error 4 (insert new user)")
                                        } 
                                        console.log("USER CREATE");
                                        ws.send("Аккаунт успешно создан, введите данные");
                                        })
                                    })

                                })},100)

                            }else{
                                ws.send("Пользователь с таким логином уже существует, попробуйте другой")
                            }
                        }); break;
                        case "#ALL": expressWs.getWss().clients.forEach(us => {
                            us.send(msg)
                        });break;

                        case "#login": console.log("LOGIN IN");
                        var logger=JSON.parse(msg.replace("#login/", ""));
                        console.log(logger,"This LOGGER")
                        client.db("hookup").collection("users").findOne({login:logger.login},(err,result)=>{
                            if (err) {
                                ws.send("Ошибка сервера");
                                return console.log(err, "my err 1 (find user for hash)");
                            } 
                            if(result){
                            if(result.pass==logger.pass){
                              return  ws.send(JSON.stringify(result));
                            }
                            }
                            console.log("PASS NOT RIGHT")
                            ws.send("#ERR/Вход не удался, попробуйте еще");
                            
                        });break

                        default: console.log("Default case message")
                }


                
            })

        })


        app.get('/', (req, res) => {
            res.sendFile(process.cwd() + "/index.html")
            console.log("PAGE IS LOAD +");
        })

        app.get("*", (req, res) => res.sendFile(process.cwd() + req.url))
    })

}