import type { NextApiRequest, NextApiResponse } from "next";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      console.log(data);

      await setDoc(doc(db, "exams", data.student), data);
      console.log(data.student + "'s exam added to firestore!");
      res.status(200).json("Success");
    } catch (err: any) {
      res.status(err).json("Error");
    }
  } else {
    res.status(405).json("Didn't work");
    res.end();
  }
}
