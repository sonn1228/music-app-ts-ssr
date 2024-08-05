import { Express } from "express";
import { systemConfig } from "../../config/system";
import { dashboardRoutes } from "./dashboard.route";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
const adminRoutes = (app: Express): void => {
  const path = `/${systemConfig.prefixAdmin}`;

  app.use(`${path}/dashboard`, dashboardRoutes);
  app.use(`${path}/topics`, topicRoutes);
  app.use(`${path}/songs`, songRoutes);
};
export default adminRoutes;
