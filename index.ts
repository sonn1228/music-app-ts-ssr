import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.set("views", "./views");
app.set("view engine", "pug");

clientRoutes(app);
adminRoutes(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
