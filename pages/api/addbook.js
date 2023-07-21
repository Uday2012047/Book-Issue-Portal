import Books from "../../models/bookschema";
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { name, bookid, studentid, duemonth } = req.body;

            // Create a new patient document
            const newBook = new Books({
                name,
                bookid,
                studentid,
                duemonth,
            });

            // Save the patient document to the database
            await newBook.save();

            res.status(200).json({ message: "Book added successfully." });
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occurred while adding he book." });
        }
    } else {
        res.status(405).json({ message: "Method not allowed." });
    }
}
