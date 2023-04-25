const express = require('express')
var body = require ('body-parser')

const app = express()

app.use(express.json())

const userController = require("../controllers/userController")
const auth = require(`../auth/auth`)

app.get("/getAll",auth.authVerify, userController.getAllUser)
app.post("/",auth.authVerify, userController.addUser)
app.post("/find",auth.authVerify, userController.findUser)
app.put("/:id",auth.authVerify, userController.updateUser)
app.delete("/:id",auth.authVerify, userController.deleteUser)

module.exports = app