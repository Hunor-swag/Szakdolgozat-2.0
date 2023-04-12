import type { NextApiRequest, NextApiResponse } from "next";
import { collection, doc, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  try {
    const docRef = collection(db, "committees");
    const docSnap = await getDocs(docRef);
    const docList = docSnap.docs.map((doc) => doc.data());

    if (docList && docList.length > 0) {
      res.status(200).json(docList);
    } else {
      throw new Error("No data found");
    }
  } catch (error: any) {
    console.log("Error fetching committees:", error.message);
    res.status(404).end(`Error during fetching committees: ${error.message}`);
  }
}
