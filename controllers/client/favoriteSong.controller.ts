import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /favorite-songs
export const index = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({
    deleted: false,
  });
  for (const item of favoriteSongs) {
    const song = await Song.findOne({
      _id: item.songId,
    });
    if (song) {
      const singer = await Singer.findOne({
        _id: song.singerId,
      });
      item["singer"] = singer;
    }
    item["song"] = song;
  }
  res.render("client/pages/songs/favorite.pug", {
    pageTitle: "Favorite songs",
    favoriteSongs: favoriteSongs,
  });
};
