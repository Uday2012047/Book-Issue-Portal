import bookissues from "../../models/bookschema";
import connectDB from "./auth/lib/connectDB";
export default async function getUser(req, res) {
  try {
    await connectDB();
    // const reports = await Prescriptions.find({
    const reports = await bookissues.find({

      username: req.query.username,
    });
    res.status(200).json(reports);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "error sending" });
  }
}
