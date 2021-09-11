import { NextApiRequest, NextApiResponse } from "next";
import { getMultipartUploads, abortMultipartUploads } from "../../../utils";


const getMultiPartList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET
    };


    let multipart_upload: any = await getMultipartUploads(params)

    if (multipart_upload.Uploads.length != 0) {
      await Promise.all(multipart_upload.Uploads.map(async (upload: { Key: any; UploadId: any; }) => {

        const params = {
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
          Key: upload.Key,
          UploadId: upload.UploadId
        };

        await abortMultipartUploads(params)

      }))
    }
    
    return res.status(200).json(multipart_upload);
  } catch (err) {
    return res.status(500).send(err)
  }
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "DELETE") {
    // POST - create multipart upload request  
    getMultiPartList(req, res);
  } else {
    res.send("Unknown")
  }
}