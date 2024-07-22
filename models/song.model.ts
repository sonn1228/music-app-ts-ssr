import mongoose from "mongoose";

interface ISong extends mongoose.Document {
  title: string;
  avatar: string;
  description: string;
  singerId: string;
  topicId: string;
  like: number;
  lyrics: string;
  audio: string;
  status: string;
  slug: string;
  listen: number;
  deleted: boolean;
  deletedAt?: Date;
  infoSinger?: any;
}

const songSchema = new mongoose.Schema<ISong>(
  {
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: {
      type: Number,
      default: 0,
    },
    lyrics: String,
    audio: String,
    status: String,
    slug: {
      type: String,
      unique: true,
    },
    listen: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model<ISong>("Song", songSchema, "songs");

export default Song;
