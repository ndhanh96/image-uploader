import multer from 'multer';
import { NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

var storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });

export default function handler(req:any, res: any) {
  upload.array('photo', 1)(req, res, (err) => {
    // do error handling here
    console.log(req.files); // do something with the files here
    res.status(200).send(req.files);
  });
  
  
}
