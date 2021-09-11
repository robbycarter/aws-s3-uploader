import { NextApiRequest, NextApiResponse } from "next";
import { generateMultipartUpload } from "../../../utils";

const createMultiPartUpload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    if (!req.body || !req.body["file_name"]) return res.status(400).send("No File Name Found in Body")

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      Key: req.body["file_name"]
    };

    let multipart_upload = await generateMultipartUpload(params)
    return res.status(200).json(multipart_upload);
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "POST") {
    // POST - get multipart upload presigned url
    createMultiPartUpload(req, res);
  } else if (req.method === "PUT") {
    createMultiPartUpload(req, res);
  } else {
    res.send("Unknown")
  }
}