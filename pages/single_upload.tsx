import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import api from '../utils/api';

const Home: NextPage = () => {

  const [file, setFile] = useState<any>(null)
  const [fileSize, setFileSize] = useState<number>(0)
  const [uploadStatus, setUploadStatus] = useState<string>("")
  const [fileUrl, setFileUrl] = useState<string>("")

  const getUploadUrl: any = (file_name: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        setUploadStatus("Preparing to Upload")
        /** make request */
        const endpoint = `/upload`
        const response = await api.get(endpoint, {
          params: { filename: file_name }
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
      let { url, fields } = await getUploadUrl(file.name)
      setUploadStatus("Uploading")
      // FormData Upload
      let formData = new FormData();

      for (var key in fields) {
        console.log(key, fields[key])
        formData.append(key, fields[key]);
      }

      formData.append('file', file);

      const endpoint = `${url}`
      const response = await api.post(endpoint, formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        }
      })

      const { data, status } = response

      if (status != 204) {
        setUploadStatus("Failed To Upload")
        console.log(data)
        return;
      }

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

      <main className="container m-auto">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-lg font-bold">Upload Status: {uploadStatus}</span>
          <span>File Size: {fileSize}</span>
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
          <button className="bg-blue-500 m-auto p-2 rounded-lg"
            onClick={() => uploadFile()}>
            Upload
          </button>
        </div>


        <div className="mt-10 p-10">
          {fileUrl ? <a className="text-blue-500 underline cursor-pointer m-auto" href={fileUrl}>{fileUrl}</a> : ""}
        </div>
      </main>


    </div>
  )
}

export default Home
