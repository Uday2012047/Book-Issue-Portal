import Books from "../../models/bookschema";
import Students from "../../models/StudentProfileModel";
import connectDB from "./auth/lib/connectDB";
export default async function getBooks(req, res) {
    try {
        await connectDB();
        // const reports = await Prescriptions.find({
        const student = await Students.find({

            username: req.query.id,
        });
        if (student.length == 0) {
            res.status(200).json({ error: "No student found", data: [] });
            return;
        }
        const books = await Books.find({

            studentid: req.query.id,
        });
        res.status(200).json({ data: books });
    } catch (err) {
        console.log(err);
        res.status(200).json({ error: "error sending" });
    }
}
