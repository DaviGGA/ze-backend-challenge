import { app } from "./app";
import { config } from "./config/config";
import { connectDatabase } from "./database/mongo";

app.listen(config.PORT, async () => {
  console.log(`Server open on port ${config.PORT}`)

  await connectDatabase();
})

