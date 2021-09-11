import { NextApiRequest, NextApiResponse } from "next";
import { abortMultipartUploads } from "../../../utils";


const abortMultiPartList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      Key: req.body.key,
      UploadId: req.body.upload_id
    };


    let multipart_upload = await abortMultipartUploads(params)
    return res.status(200).json(multipart_upload);
  } catch (err) {
    return res.status(500).send(err)
  }
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "DELETE") {
    // POST - create multipart upload request  
    abortMultiPartList(req, res);
  }  else {
    res.send("Unknown")
  }
}