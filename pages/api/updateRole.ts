import type { NextApiRequest, NextApiResponse } from "next";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      await updateDoc(doc(db, "users", data.user), {
        email: data.user,
        role: data.role,
      });
      console.log(
        data.user + " has been updated to " + data.role + " role successfully"
      );
      res.status(200).end();
    } catch (err: any) {
      res.status(err).json("Error");
    }
  } else {
    res.status(405).json("Didn't work");
    res.end();
  }
}
