import { createUser } from "#db/queries/users";
import express from "express";
import jwt from "jsonwebtoken"
const router = express.Router()
export default router

router.route("/register").post(async (req, res, next)=>{
const {username, password} = req.body

if (!username || !password) {
    return res.status(400).send("Missing username or password")
}

const newUser = await createUser({username, password})
const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET)

res.status(200).send(token)

})