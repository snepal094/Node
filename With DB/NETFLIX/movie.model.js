import mongoose from "mongoose";

//set schema (rule)
const movieSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  leadActor: String,
});

//create collection (table/model)
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
