import { NextApiRequest, NextApiResponse } from "next";
import { generateFiles } from "../../utils";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const { user, year } = req.query;
  const extension = user === "fran" ? "tsx" : "jsx";

  if (user && year) {
    generateFiles(user as "fran" | "joel", year as string, extension);
  }
  res.status(200).json({ data: "Generated" });
}
