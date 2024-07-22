import { Express, Request, Response } from "express";
import { topicsRoutes } from "./topic.route";
import { homeRoutes } from "./home.route";

const clientRoutes = (app: Express): void => {
  app.use("/", homeRoutes);
  app.use("/topics", topicsRoutes);
  app.get("/*", (req: Request, res: Response) => {
    res.redirect("/");
  });
};

export default clientRoutes;
