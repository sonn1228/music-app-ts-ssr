import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import path from "path";
import { systemConfig } from "./config/system";
dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
app.use(express.static(`${__dirname}/public`));

app.set("views", "./views");
app.set("view engine", "pug");

clientRoutes(app);
adminRoutes(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
