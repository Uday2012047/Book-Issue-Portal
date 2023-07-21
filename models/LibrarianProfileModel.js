import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    gender: {
      type: String,
    },
    username: {
      type: String,
    },
    Department: {
      type: String,
    },
    age: {
      type: Number,
    },
    role: {
      type: String,
    },
    phone: {
      type: Number,
    },
    profilephoto: {
      type: String,
    },
    experience: {
      type: Number,
    },
    About: {
      type: String,
    },
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.Librarianprofiles ||
  mongoose.model("Librarianprofiles", profileSchema);
export default Dataset;
