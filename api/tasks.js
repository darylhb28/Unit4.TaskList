import { createTask, deleteTaskbyTaskID, getTaskByTaskID, getTasksByUserID, updateTaskByTaskID } from "#db/queries/tasks"
import { verifyToken } from "#middleware/middleware"
import express from "express"
import jwt from "jsonwebtoken"
const router = express.Router()
export default router

//🔒POST /tasks
router.route("/").post(verifyToken, async(req, res, next)=>{
const {title, done} = req.body

if (!title || !done){
    return res.status(400).send("Missing required fields.")
}

const newTask = await createTask({
    title: title,
    done: done,
    user_id: req.user.id 
})
res.status(200).send(newTask)
})

//🔒GET /tasks 
router.route("/").get(verifyToken, async (req, res, next)=>{
const tasks = await getTasksByUserID({user_id : req.user.id})
res.status(200).send(tasks)
})

//🔒PUT /tasks/:id
router.route("/:id").put(verifyToken, async (req, res, next)=>{
const {title, done} = req.body

if (!title || !done){
    return res.status(400).send("Missing required fields.")
}

const id = Number(req.params.id)
const foundTask = await getTaskByTaskID({id})

if (!foundTask){
    return res.status(400).send("There is no task associated with that id")
}

if (foundTask.user_id !== req.user.id){
    return res.status(403).send("Forbidden: User does not own this task")
}

const updatedTask = await updateTaskByTaskID({
    title: title,
    done: done,
    id: id
})
res.status(200).send(updatedTask)

})

//🔒DELETE /tasks/:id
router.route('/:id').delete(verifyToken, async (req,res,next)=>{

const id = Number(req.params.id)
const foundTask = await getTaskByTaskID({id})

if (!foundTask){
    return res.status(400).send("There is no task associated with that id")
}

if (foundTask.user_id !== req.user.id){
    return res.status(403).send("Forbidden: User does not own this task")
}

const result = await deleteTaskbyTaskID({id})
res.status(200).send("Task Deleted")

})
