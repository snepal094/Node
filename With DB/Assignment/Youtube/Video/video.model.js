import mongoose, { mongo } from "mongoose";

const videoSchema = new mongoose.Schema({
  creatorName: String,
  videoName: String,
  videoDurationInMinutes: Number,
  videoCategory: String,
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
