import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const newUser = await createUser({
    username: "user1",
    password: "1234"
  })

  await createTask({
    title: "Grocery Shop",
    done: false,
    user_id: newUser.id
  })

  await createTask({
    title: "Do Laundry",
    done: false,
    user_id: newUser.id
  })

  await createTask({
    title: "Pick Up Dry Cleaning",
    done: false,
    user_id: newUser.id
  })

}
