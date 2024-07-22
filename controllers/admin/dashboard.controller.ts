import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  try {
    res.render("admin/pages/dashboard/index.pug");
  } catch (error) {
    res.json({
      code: 400,
      error: error,
    });
  }
};
