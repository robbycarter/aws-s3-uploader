import { NextApiRequest, NextApiResponse } from "next";
import { ICompletedMultipart } from "../../../types";
import { completeMultipartUpload } from "../../../utils";

const completeMultiPartUpload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    req.body.parts = req.body.parts.sort((a: ICompletedMultipart, b: ICompletedMultipart) => {
      if (a.PartNumber < b.PartNumber) {
        return -1;
      }
      if (a.PartNumber > b.PartNumber) {
        return 1;
      }
      return 0;
    })

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      Key: req.body.file_name,
      UploadId: req.body.upload_id,
      MultipartUpload: {
        Parts: req.body.parts
      }
    };

    let multipart_upload = await completeMultipartUpload(params)
    return res.status(200).json(multipart_upload);
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    // PUT - complete multipart upload
    completeMultiPartUpload(req, res)
  } else {
    res.send("Unknown")
  }
}