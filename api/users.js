import { createUser, getUser } from "#db/queries/users";
import express from "express";
import jwt from "jsonwebtoken"
const router = express.Router()
export default router
import bcrypt from "bcrypt"

router.route("/register").post(async (req, res, next)=>{
const {username, password} = req.body

if (!username || !password) {
    return res.status(400).send("Missing username or password")
}

const newUser = await createUser({username, password})
const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET)

res.status(200).send(token)

})

router.route("/login").post( async (req, res, next)=>{
const {username, password} = req.body

if (!username || !password) {
    return res.status(400).send("Missing username or password")
}

const realUserInfo = await getUser({username})
const isMatch = await bcrypt.compare(password, realUserInfo.password)


if (!isMatch){
    return res.status(401).send("Wrong login info")
}

const token = jwt.sign({id: realUserInfo.id, username: realUserInfo.username}, process.env.JWT_SECRET)
res.status(200).send(token)

})