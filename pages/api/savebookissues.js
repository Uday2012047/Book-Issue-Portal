import bookissues from "../../models/bookschema";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, imageUrl, librarianName } = req.body;

      // Create a new patient document
      const newPatient = new bookissues({
        username,
        imageUrl,
        librarianName,
      });

      // Save the patient document to the database
      await newPatient.save();

      res.status(200).json({ message: "Student data saved successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while saving the patient data." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
