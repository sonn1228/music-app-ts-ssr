import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug.helper";
// [GET] /search/result
export const result = async (req: Request, res: Response) => {
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
      item["infoSinger"] = infoSinger;
    }
    console.log(songs);
    newSongs = songs;
  }
  console.log(newSongs);
  res.render("client/pages/search/result.pug", {
    keyword,
    songs: newSongs,
  });
};
