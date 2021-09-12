import AWS from 'aws-sdk'

const credentials = {
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY || '',
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY || ""
};

AWS.config.update({
  credentials: credentials,
  region: process.env.NEXT_PUBLIC_S3_REGION,
  signatureVersion: 'v4'
});

const s3 = new AWS.S3();

export const generatePresignedPostUrl = (params:any) => {
  return new Promise(async(resolve,reject) => {
    try {

      s3.createPresignedPost(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            reject({
              message: "Error creating presigned URL",
              error: err
            })
        } else {
          resolve(data)
        }
    });

    } catch(err) {
      reject(err)}
  })
}

export const generatePresignedGetUrl = (params :any) => {
  return new Promise(async(resolve,reject) => {
    try {

      s3.getSignedUrl('getObject',params, function (err, data) {
        if (err) {
            console.log("Error", err);
            reject({
              message: "Error creating presigned URL",
              error: err
            })
        } else {
          resolve(data)
        }
    });

    } catch(err) {
      reject(err)}
  })
}


/**
 * Function to generate multipart upload id
 * @param params
 * @returns
 */
export const generateMultipartUpload = (params: any) => {
  return new Promise(async(resolve,reject) => {
    try {

      s3.createMultipartUpload(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            reject({
              message: "Error creating presigned URL",
              error: err
            })
        } else {
          resolve(data)
        }
    });

    } catch(err) {
      reject(err)}
  })
}


/**
 * Function to generate multipart presign url for file
 */
export const generatePresignUrlParts = (params:any) => {
  return new Promise(async(resolve,reject) => {
    try {

      s3.getSignedUrl("uploadPart",params, function (err, data) {
        if (err) {
            console.log("Error", err);
            reject({
              message: "Error creating presigned URL",
              error: err
            })
        } else {
          resolve(data)
        }
    });

    } catch(err) {
      reject(err)}
  })
}


/**
 * Function to complete a multipart upload
 */
export const completeMultipartUpload = (params:any) => {
  return new Promise(async(resolve,reject) => {
    try {

      s3.completeMultipartUpload(params, function (err, data) {
        if (err) {
            reject(err)
        } else {
          resolve(data)
        }
    });

    } catch(err) {
      reject(err)}
  })
}

/**
 * Function to get all multipart uploads
 */
export const getMultipartUploads = (params: any) => {
  return new Promise(async(resolve,reject) => {
    try {

      s3.listMultipartUploads(params, function (err, data) {
        if (err) {
            reject(err)
        } else {
          resolve(data)
        }
    });

    } catch(err) {
      reject(err)}
  })
}

/**
 * Function to abort a multipart upload
 */
 export const abortMultipartUploads = (params: any) => {
  return new Promise(async(resolve,reject) => {
    try {

      s3.abortMultipartUpload(params, function (err, data) {
        if (err) {
            reject(err)
        } else {
          resolve(data)
        }
    });

    } catch(err) {
      reject(err)}
  })
}