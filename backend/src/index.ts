import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routers/authRouter";
import companyRouter from "./routers/companyRouter";
import { initTables } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

initTables();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Server is running");
});

app.use("/user", authRouter);

// Middle ware 
// app.use(checkAuth);

app.use("/company", companyRouter)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
