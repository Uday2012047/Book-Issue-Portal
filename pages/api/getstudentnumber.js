import StudentProfile from "../../models/StudentProfileModel";
import connectDB from "./auth/lib/connectDB";
export default async function getUser(req, res) {
  try {
    await connectDB();
    const profile = await StudentProfile.findOne({
      username: req.query.username,
    });
    res.status(200).json({ phone: profile.phone });
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "error sending" });
  }
}
