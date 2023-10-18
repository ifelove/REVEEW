const mongoose = require("mongoose");

const FeedSchema = new mongoose.Schema({
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  date_posted: { type: Date, default: Date.now() },
  poster: { type: mongoose.Types.ObjectId },
  feed_img: { type: String },
  poster_img: { type: String },
  content: { type: String },
  title: { type: String },
  userLike: { type: Boolean, default: false },
});

module.exports = mongoose.model("Feed", FeedSchema);
