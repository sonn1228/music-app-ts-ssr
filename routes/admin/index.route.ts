import { Express } from "express";
import { systemConfig } from "../../config/system";
import { dashboardRoutes } from "./dashboard.route";
import { topicRoutes } from "./topic.route";
const adminRoutes = (app: Express): void => {
  const path = `/${systemConfig.prefixAdmin}`;

  app.use(`${path}/dashboard`, dashboardRoutes);
  app.use(`${path}/topics`, topicRoutes);
};
export default adminRoutes;
