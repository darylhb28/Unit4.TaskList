import db from "#db/client"

export async function createTask({title, done, user_Id}){
const sql = `
INSERT INTO tasks (title, done, user_Id)
VALUES ($1, $2, $3)
RETURNING *;
`
const {rows: {task}} = await db.query(sql, [title, done, user_Id])
return task

}