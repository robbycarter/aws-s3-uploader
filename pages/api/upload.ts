// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generatePresignedPostUrl } from '../../utils';



const generatePresignedURL = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      Expires: 10000000, //time to expire in seconds
      Fields: {
        key: req.query.filename
      },
      conditions: [
        { acl: 'private' },
        { success_action_status: "201" }]
    };

    let presigned_post_url = await generatePresignedPostUrl(params)
    return res.status(200).json(presigned_post_url);
  } catch (err) {
    return res.status(500).send(err)
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  generatePresignedURL(req, res)
}
