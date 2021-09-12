import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import api from '../utils/api';
import { humanFileSize } from '../utils/extra';

interface Part {
  ETag: string
  PartNumber: number
}

const Home: NextPage = () => {

  const [file, setFile] = useState<any>(null)
  const [fileSize, setFileSize] = useState<number>(0)
  const [uploadStatus, setUploadStatus] = useState<string>("")
  const [fileUrl, setFileUrl] = useState<string>("")
  const [chunkNumber, setChunkNumber] = useState<number>(0);
  const [uploadedChunk, setUploadedChunk] = useState<number>(0)

  // 10MB per chunk
  const FILE_CHUNK_SIZE = 10_000_000
  const [uploadId, setUploadId] = useState<string | null>(null)

  const getUploadUrl: any = () => {
    return new Promise(async (resolve, reject) => {
      try {
        setUploadStatus("Preparing to Upload")
        /** make request */
        const endpoint = `/multipart/create-multipart-upload`
        const response = await api.put(endpoint, {
          "file_name": file.name
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const { data, status, headers } = response;
        if (status != 200) {
          setUploadStatus("Failed To Upload")
          reject(data);
        }

        resolve(data)
      } catch (err) {
        setUploadStatus("Failed To Upload")
        reject(err)
      }
    })
  };

  const getPresignedUrls: any = (part_number: number, upload_id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        setUploadStatus("Preparing to Upload")
        /** make request */
        const endpoint = `/multipart/create-presigned-urls`
        const response = await api.post(endpoint, {
          "file_name": file.name,
          "upload_id": upload_id,
          "part_number": part_number
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const { data, status } = response;
        if (status != 200) {
          setUploadStatus("Failed To Upload")
          reject(data);
        }

        resolve(data)
      } catch (err) {
        setUploadStatus("Failed To Upload")
        reject(err)
      }
    })
  };

  const completeUpload: any = (upload_id: string, parts: { ETag: any; PartNumber: number; }[]) => {
    return new Promise(async (resolve, reject) => {
      try {
        setUploadStatus("Preparing to Upload")
        /** make request */
        const endpoint = `/multipart/complete-multipart-upload`
        const response = await api.put(endpoint, {
          "file_name": file.name,
          "upload_id": upload_id,
          "parts": parts
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const { data, status } = response;
        if (status != 200) {
          setUploadStatus("Failed To Upload")
          reject(data);
        }

        resolve(data)
      } catch (err) {
        setUploadStatus("Failed To Upload")
        reject(err)
      }
    })
  }

  const getFileDownloadLink: any = (file_name: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        setUploadStatus("Preparing download link")
        /** make request */
        const endpoint = `/get_link`
        const response = await api.get(endpoint, {
          params: { filename: file_name }
        })

        const { data, status } = response;
        if (status != 200) {
          setUploadStatus("Failed to get link")
          reject(data);
        }

        resolve(data)
      } catch (err) {
        setUploadStatus("Failed to get link")
        reject(err)
      }
    })
  }

  const uploadFile = async () => {
    try {

      // Get Upload Url
      let { Bucket, Key, UploadId } = await getUploadUrl()
      setUploadStatus("Uploading")

      setUploadId(UploadId)

      // Split file into chunks
      const NUM_CHUNKS = Math.floor(fileSize / FILE_CHUNK_SIZE) + 1;
      setChunkNumber(NUM_CHUNKS)
      let blocks = [];
      let start, end, blob
      let uploadPartsArray: { ETag: any; PartNumber: number; }[] = []

      // Build chunks data
      for (let index = 1; index < NUM_CHUNKS + 1; index++) {
        start = (index - 1) * FILE_CHUNK_SIZE
        end = (index) * FILE_CHUNK_SIZE
        blob = (index < NUM_CHUNKS) ? file.slice(start, end) : file.slice(start)

        blocks.push({
          part: index,
          block: blob
        })
      }

      await Promise.all(blocks.map(async block => {

        // (1) Generate presigned URL for each part
        let presigned_url = await getPresignedUrls(block.part, UploadId);

        // (2) Puts each file part into the storage server
        setUploadStatus("Uploading")
        let uploadResp = await api.put(presigned_url,
          block.block, {
          headers: { 'Content-Type': file.type }
        })

        const { data, status, headers } = uploadResp

        setUploadedChunk(prev => {
          return prev + 1
        })

        uploadPartsArray.push({
          ETag: headers.etag,
          PartNumber: block.part
        })
      }))

      // Complete Multipart file upload
      let complete_upload = await completeUpload(UploadId, uploadPartsArray);
      setUploadStatus("Upload Complete")

      let result = await getFileDownloadLink(file.name)
      setUploadStatus("Download Link Below")
      setFileUrl(result)

    } catch (err) {
      console.log(err);
      return;
    }
  }

  return (
    <div>
      <Head>
        <title>Multipart File Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container m-auto mt-10">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-lg font-bold">Upload Status: {uploadStatus}</span>
          <span>File Size: {fileSize && humanFileSize(fileSize)}</span>
          <span>Progress: {chunkNumber && uploadedChunk && (uploadedChunk/chunkNumber) * 100} %</span>
        </div>

        <div className="flex flex-col gap-2 text-center mt-10">
          <input className="m-auto" type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0])
                setFileSize(e.target.files[0].size)
                setUploadStatus("File Selected")
              }
            }}
          ></input>
          <div className="flex justify-center gap-2 mt-5">
          <button className="bg-blue-500 p-2 rounded-lg"
            onClick={() => uploadFile()}>
            Upload
          </button>
          <button className="bg-red-500  p-2 rounded-lg"
            onClick={() => {
              setFile(null)
              setFileSize(0)
              setUploadStatus("Pick a file to upload")
              setFileUrl("")
              setChunkNumber(0)
              setUploadedChunk(0)
            }}>
            Reset
          </button>
          </div>
        </div>


        <div className="mt-10 p-10">
          {fileUrl ? <a className="text-blue-500 underline cursor-pointer m-auto" href={fileUrl}>{fileUrl}</a> : ""}
        </div>
      </main>


    </div>
  )
}

export default Home
