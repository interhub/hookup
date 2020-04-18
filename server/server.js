const express = require('express')
const app = express()
const port = require("./port.js")
const routes=require("./routes.js");
routes(app);
app.listen(port, () => console.log(`SERVER START ON PORT`, port))