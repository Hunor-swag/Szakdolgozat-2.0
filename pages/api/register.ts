import type { NextApiRequest, NextApiResponse } from "next";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === "POST") {
    try {
      const data = { ...req.body, role: "admin" };

      await setDoc(doc(db, "users", data.email), data);
      console.log(`User created for email ${data.email}`);
      res.status(200).end();
    } catch (err: any) {
      res.status(err).json("Error");
    }
  } else {
    res.status(405).json("Didn't work");
    res.end();
  }
}
