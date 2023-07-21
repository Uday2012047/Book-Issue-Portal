import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    name: String,
    bookid: String,
    studentid: String,
    duemonth: String,
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.books || mongoose.model("books", bookSchema);
export default Dataset;
