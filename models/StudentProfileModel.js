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
    role: {
      type: String,
    },
    username: {
      type: String,
    },
    phone: {
      type: Number,
    },
    ScholarId: {
      type: Number,
    },
    DOB: {
      type: Number,
    },
    address: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    profilephoto: {
      type: String,
    },
    gender: {
      type: String,
    },
    CGPA: {
      type: Number,
    },
    Hostel: {
      type: String,
    },
    Dept: {
      type: String,
    },
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.StudentProfiles ||
  mongoose.model("StudentProfiles", profileSchema);
export default Dataset;
