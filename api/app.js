import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/auth/", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);

app.listen(8080, () => {
  console.log("server started");
});
