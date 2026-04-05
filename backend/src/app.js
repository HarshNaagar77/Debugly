const express = require("express")
const aiRoutes = require('./routes/ai.routes')
const cors =  require('cors')
const app = express()

app.get("/", (req, res)=>{
    res.send("Hello World")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: 'https://debuglyclient.onrender.com',
    credentials: true
}))

app.use('/ai', aiRoutes);

module.exports = app