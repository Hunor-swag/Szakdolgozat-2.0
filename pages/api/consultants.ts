import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData | { message: string }>
) {
  try {
    const docRef = collection(db, "consultants");
    const docSnap = await getDocs(docRef);
    const docList = docSnap.docs.map((doc) => doc.data());

    if (docList.length > 0) {
      res.status(200).json(docList);
    } else {
      res.status(404).json({ message: "No consultant data found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
