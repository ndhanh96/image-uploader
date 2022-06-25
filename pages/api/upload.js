import multer from 'multer';
import { NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// var storage = multer.diskStorage({
//   destination: './public/uploads',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV"
  },
});

var upload = multer({ storage: storage });

export default function handler(req, res) {
  upload.single('photo')(req, res, (err) => {
    // do error handling here
    // console.log(req.files);  
    // res.status(200).send(req.files);
    res.status(200).json({picture:req.file.path})
  });
}
