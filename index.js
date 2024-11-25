// import { Register } from "./controllers/register";
import express from "express";
import cors from "cors"
import router from "./router/index.js";
import "./models/config.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(router)



const port = 6001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
