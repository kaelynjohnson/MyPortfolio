// server.js - starts the Express server and connects it to the MongoDB database
import mongoose from "mongoose";
import config from "./config/config.js";
import app from "./server/express.js";
import router from "./server/assets-router.js";

// Connect to the Portfolio database using Mongoose
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to the Portfolio database"))
  .catch((error) => console.error("Database connection error:", error));

app.use("/src", router);

// Welcome message shown at the home address of the server
app.use("/", function (req, res) {
  res.send("Welcome to My Portfolio application");
});

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}/`);
});

export default app;