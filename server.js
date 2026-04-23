import { app } from "./src/app.js";
import connectDb from "./src/config/db.js";

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running");
  connectDb();
});
