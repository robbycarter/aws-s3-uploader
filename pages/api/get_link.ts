// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generatePresignedGetUrl } from '../../utils';


const  generatePresignedURL = async (req: NextApiRequest, res:NextApiResponse) => {  
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      Key: req.query.filename
    };
  
    let presigned_url = await generatePresignedGetUrl(params)
    return res.status(200).json(presigned_url);
  } catch (err) {
    return res.status(500).send(err)
  } 
};

export default function handler(req: NextApiRequest,  res: NextApiResponse) {
  generatePresignedURL(req,res)
}
