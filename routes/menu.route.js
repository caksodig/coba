const express = require('express')
var body = require ('body-parser')

const app = express()

app.use(express.json())
const auth = require(`../auth/auth`)
const menuController = require("../controllers/menuController")

app.get("/getAll",auth.authVerify, menuController.getAllMenu)
app.post("/",auth.authVerify, menuController.addMenu)
app.post("/find",auth.authVerify, menuController.findMenu)
app.put("/:id",auth.authVerify, menuController.updateMenu)
app.delete("/:id",auth.authVerify, menuController.deleteMenu)

module.exports = app