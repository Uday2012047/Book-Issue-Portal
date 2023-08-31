import Studentprofile from "../../models/StudentProfileModel";
import connectDB from "./auth/lib/connectDB";
export default async function handler(req, res) {
  try {
    await connectDB();
    const body = req.body;
    const profile = await Studentprofile.findOneAndUpdate(
      {
        email: body.email,
      },
      {
        address: body.address,
        pincode: body.pincode,
        DOB: body.DOB,
        CGPA: body.CGPA,
        Dept: body.Dept,
        gender: body.gender,
        profilephoto: body.profilephoto,
        Hostel: body.Hostel,
      }
    );
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "error" });
  }
}
