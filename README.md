
<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />

## Multipart + Presigned URL upload to AWS S3 via the browser

<br />
<p align="center">

  <p align="center">
    <br />
    <a href="https://github.com/robbycarter/aws-s3-uploader">View Demo</a>
    ·
    <a href="https://github.com/robbycarter/aws-s3-uploader/issues">Report Bug</a>
    ·
    <a href="https://github.com/robbycarter/aws-s3-uploader/issues">Request Feature</a>
  </p>
</p>
<br />


<!-- ABOUT THE PROJECT -->
## About The Project

### Built With

* [Next JS](https://nextjs.org/)
* [React JS](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)



<!-- GETTING STARTED -->
## Getting Started

This repo demonstrates the use of multipart + presigned URLs to upload large files to an AWS S3-compliant storage service.

<br />
<br />

### Prerequisites


* AWS IAM Access Key and Secret Key
* AWS S3 Bucket

<br />

> Note: Set the S3-compliant bucket policy as appropriate to allow the right access

<br />
<br />

### Installation

1. Set up your env variable following the .env.example
2. Run the commands
   ```
   yarn or npm install
   yarn or npm run dev
   ```
   
3. Go to `http://localhost:3000` in your browser window and upload a file.




<br />
<br />

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/robbycarter/aws-s3-uploader/issues) for a list of proposed features (and known issues).


<br />
<br />

## Todo
* abort multipart upload on failure
* test code
* auto clean up handing multipart uploads
* improve error handling

<br />
<br />


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br />
<br />

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information.

<br />
<br />

<!-- CONTACT -->
## Contact

RobbyCarter - [@Robby_Carter_](https://twitter.com/Robby_Carter_) - email@example.com

Project Link: [https://github.com/robbycarter/aws-s3-uploader](https://github.com/robbycarter/aws-s3-uploader)







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/robbycarter/aws-s3-uploader.svg?style=for-the-badge
[contributors-url]: https://github.com/robbycarter/aws-s3-uploader/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/robbycarter/aws-s3-uploader.svg?style=for-the-badge
[forks-url]: https://github.com/robbycarter/aws-s3-uploader/network/members

[stars-shield]: https://img.shields.io/github/stars/robbycarter/aws-s3-uploader.svg?style=for-the-badge
[stars-url]: https://github.com/robbycarter/aws-s3-uploader/stargazers

[issues-shield]: https://img.shields.io/github/issues/robbycarter/aws-s3-uploader.svg?style=for-the-badge
[issues-url]: https://github.com/robbycarter/aws-s3-uploader/issues

[license-shield]: https://img.shields.io/github/license/robbycarter/aws-s3-uploader.svg?style=for-the-badge
[license-url]: https://github.com/robbycarter/aws-s3-uploader/blob/master/LICENSE

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/robert-quainoo-076704b8/