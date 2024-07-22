import { Express } from "express";
import { homeRoutes } from "./home.route";
import { songRoutes } from "./song.route";
import { topicsRoutes } from "./topic.route";
import { favoriteSongRoutes } from "./favorite-songs";

const clientRoutes = (app: Express): void => {
  app.use("/", homeRoutes);
  app.use("/topics", topicsRoutes);
  app.use("/songs", songRoutes);
  app.use("/favorite-songs", favoriteSongRoutes);
};

export default clientRoutes;
