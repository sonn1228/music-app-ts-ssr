import { Request, Response } from "express";

// [GET] /topics
export const index = async (req: Request, res: Response) => {
  res.render("client/pages/home/index.pug", {
    pageTitle: "Home Page",
  });
};
