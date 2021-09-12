import { NextApiRequest, NextApiResponse } from "next";
import { generatePresignUrlParts } from "../../../utils";


const getMultiPartUpload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      Key: req.body["file_name"],
      UploadId: req.body["upload_id"],
      PartNumber: req.body.part_number
    };


    let multipart_upload = await generatePresignUrlParts(params)
    return res.status(200).json(multipart_upload);
  } catch (err) {
    return res.status(500).send(err)
  }
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "POST") {
    // POST - create multipart upload request
    getMultiPartUpload(req, res);
  }  else {
    res.send("Unknown")
  }
}