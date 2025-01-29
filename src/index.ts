import { app } from "./app";
import { config } from "./config/config";
import { connectDatabase } from "./database/mongo";

app.listen(config.PORT, async () => {
  console.log(`Server open on port 3001 ${config.PORT}`)

  await connectDatabase();
})

