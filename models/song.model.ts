import mongoose, { Document, Schema } from "mongoose";

interface ISong extends Document {
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
  isFavoriteSong?: any;
}

const songSchema = new Schema<ISong>(
  {
    title: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    singerId: {
      type: String,
      required: true,
    },
    topicId: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    lyrics: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
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
