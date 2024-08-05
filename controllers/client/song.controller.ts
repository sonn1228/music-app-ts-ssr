import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

// [GET] /song/:slugTopic
export const list = async (req: Request, res: Response) => {
  const slug: string = req.params.slugTopic;

  const topic = await Topic.findOne({
    slug: slug,
    deleted: false,
    status: "active",
  });

  try {
    if (topic) {
      const songs = await Song.find({
        topicId: topic.id,
        deleted: false,
        status: "active",
      });
      for (let song of songs) {
        const singer = await Singer.findOne({
          _id: song.singerId,
          status: "active",
          deleted: false,
        });
        song.infoSinger = singer;
      }
      res.render("client/pages/songs/list.pug", {
        pageTitle: "Topic Client",
        songs: songs,
        topic,
      });
      return;
    }
    res.json({
      code: 400,
      message: "Topic is null!",
    });
  } catch (error) {
    res.json({
      code: 400,
      error: error,
    });
  }
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slug: string = req.params.slugSong;
  try {
    const song = await Song.findOne({
      slug: slug,
      status: "active",
      deleted: false,
    });
    if (song) {
      const singer = await Singer.findOne({
        _id: song.singerId,
      });
      const topic = await Topic.findOne({
        _id: song.topicId,
      });
      const favoriteSong = await FavoriteSong.findOne({
        songId: song.id,
      });
      song["isFavoriteSong"] = favoriteSong ? true : false;
      res.render("client/pages/songs/detail.pug", {
        song,
        singer,
        topic,
        pageTitle: song.title,
      });
      return;
    }
    res.json({
      code: 400,
      error: "Song not found!",
    });
  } catch (error) {
    res.json({
      code: 400,
      error: error,
    });
  }
};
// [GET] /songs/like/:typeLike/:idSong

export const like = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeLike: string = req.params.typeLike;
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });
  if (song) {
    let newLike: number = song.like;
    newLike = typeLike == "like" ? newLike + 1 : newLike - 1;
    await Song.updateOne(
      {
        _id: idSong,
      },
      {
        like: newLike,
      }
    );

    res.json({
      code: 200,
      message: "Success",
      like: newLike,
    });
    return;
  }
  res.json({
    code: 400,
    message: "error",
  });
};

// [GET] /songs/favorite/:typeFavorite/:idSong
export const favoritePatch = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeFavorite: string = req.params.typeFavorite;
  try {
    switch (typeFavorite) {
      case "favorite":
        const existFavoritesSong = await FavoriteSong.findOne({
          songId: idSong,
        });
        if (!existFavoritesSong) {
          const favoriteSong = new FavoriteSong({
            userId: "",
            songId: idSong,
          });
          await favoriteSong.save();
        }
        break;
      case "unfavorite":
        await FavoriteSong.deleteOne({
          songId: idSong,
        });
        break;
      default:
        res.json({
          code: 400,
          error: "error",
        });
        return;
    }
    res.json({
      code: 200,
      message: "success",
    });
  } catch (error) {
    res.json({
      code: 400,
      error: error,
    });
  }
};
// [GET] /songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
  const id: string = req.params.songId;
  const song = await Song.findOne({
    _id: id,
    deleted: false,
  });

  if (song) {
    try {
      const listen = song.listen + 1;
      await Song.updateOne(
        {
          _id: id,
        },
        {
          listen: listen,
        }
      );

      res.json({
        code: 200,
        listen: listen,
        message: "Success",
      });
    } catch (error) {
      res.json({
        code: 400,
        message: "Error",
      });
    }
  }
};
