import Users from "../../models/StudentUserModel";
import StudentProfiles from "../../models/StudentProfileModel";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const body = req.body;
  const userExists = await Users.findOne({ phone: body.phone });
  if (userExists) {
    res.status(200).json({ message: "Already registered" });
    return;
  }
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashpass = await bcrypt.hash(body.password, salt);
  function createUserID(ScholarId) {
    const formattedPhoneNumber = ScholarId.replace(/\D/g, '');
    const lastFiveDigits = formattedPhoneNumber.slice(-7);
    const userID = "B-" + lastFiveDigits;
    return userID;
  }

  const user = new Users({
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
    phone: body.phone,
    role: body.role,
    ScholarId: body.ScholarId,
    username: createUserID(body.ScholarId),
    password: hashpass,
  });
  const profile = new StudentProfiles({
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
    phone: body.phone,
    role: body.role,
    ScholarId: body.ScholarId,
    address: "",
    pincode: 0,
    profilephoto: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg",
    gender: "",
    DOB: 0,
    Dept: "",
    CGPA: 0,
    Hostel: "",
    username: createUserID(body.ScholarId)
  });
  await user.save();
  await profile.save();
  res.status(200).json({ message: "Registered successfully" });
}
