import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

// [GET] /:slugTopic
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
