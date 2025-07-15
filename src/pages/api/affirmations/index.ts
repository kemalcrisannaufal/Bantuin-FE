import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const response = await fetch("https://www.affirmations.dev/");
    const data = await response.json();

    return res.status(200).json({
      meta: {
        status: 200,
        message: "Success get affirmations!",
      },
      data,
    });
  }
}
