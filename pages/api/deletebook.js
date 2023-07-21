import Books from "../../models/bookschema";
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { bookid, studentid } = req.body;
            const profile = await Books.findOneAndDelete({
                bookid: bookid,
                studentid: studentid,
            });

            res.status(200).json({ message: "Book deleted successfully." });
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occurred while adding he book." });
        }
    } else {
        res.status(405).json({ message: "Method not allowed." });
    }
}