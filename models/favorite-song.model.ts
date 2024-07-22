import mongoose from "mongoose";

interface IFavoriteSong extends mongoose.Document {
  userId: String;
  songId: String;
  deleted: {
    type: Boolean;
    default: false;
  };
  deletedAt: Date;
  song: any;
  singer: any;
}
const favoriteSongSchema = new mongoose.Schema<IFavoriteSong>(
  {
    userId: String,
    songId: String,
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

const FavoriteSong = mongoose.model<IFavoriteSong>(
  "FavoriteSong",
  favoriteSongSchema,
  "favorite-songs"
);

export default FavoriteSong;
