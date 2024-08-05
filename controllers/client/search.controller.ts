import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug.helper";
// [GET] /search/:type
export const result = async (req: Request, res: Response) => {
  const type = req.params.type;

  const keyword = req.query.keyword;
  // if(typeof keyword === 'string'){
  let newSongs: any = [];
  if (typeof keyword === "string") {
    const keywordRegex = new RegExp(keyword, "i");
    const stringSlug = convertToSlug(keyword);
    const slugRegex = new RegExp(stringSlug, "i");
    const songs = await Song.find({
      $or: [{ title: keywordRegex }, { slug: slugRegex }],
    });

    for (const item of songs) {
      const infoSinger = await Singer.findOne({
        _id: item.singerId,
      });
      if (typeof infoSinger === "object" && infoSinger != null)
        newSongs.push({
          id: item.id,
          avatar: item.avatar,
          title: item.title,
          like: item.like,
          slug: item.slug,
          infoSinger: {
            fullName: infoSinger.fullName,
          },
        });
    }
  }
  switch (type) {
    case "result":
      res.render("client/pages/search/result.pug", {
        keyword,
        songs: newSongs,
      });
      break;
    case "suggest":
      try {
        res.json({
          code: 200,
          message: "success",
          songs: newSongs,
        });
      } catch (error) {
        res.json({
          code: 400,
          message: error,
        });
      }
    default:
      break;
  }
};

// [GET] /search/suggest
export const suggest = async (req: Request, res: Response) => {
  res.json({
    code: 200,
    message: "Success",
  });
};
