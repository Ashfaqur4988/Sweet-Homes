import express from "express";

import authRoute from "./routes/auth.route.js";
const app = express();

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/auth/", authRoute);

app.listen(8080, () => {
  console.log("server started");
});
