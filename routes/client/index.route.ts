import { Express } from "express";
import { topicsRoutes } from "./topic.route";
import { homeRoutes } from "./home.route";

const clientRoutes = (app: Express): void => {
  app.use("/", homeRoutes);
  app.use("/topics", topicsRoutes);
};

export default clientRoutes;
