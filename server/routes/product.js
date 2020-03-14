const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth");

//=================================
//             Product
//=================================
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true)
  }
});

var upload = multer({storage}).single("file");

router.post("/uploadImage", auth, (req, res) => {
  //after getting that image from client
  // we need to save it inside Node Server
  
  //Multer library
  
  upload(req, res, err => {
    if(err) return res.json({success: false, err});
    return res.json({success: true, image: res.req.file.path, fileName: res.req.file.filename})
  })
});

router.post("/uploadProduct", auth, (req, res) => {
  
  // save all the data we got from the client into the DB
  const product = new Product(req.body);
  product.save((err) => {
    if(err) return res.status(400).json({success: false, err})
    return res.status(200).json({success: true})
  })
  
});

router.get("/getProducts", auth, (req, res) => {
  Product.find()
    .exec((err, products) => {
      if(err) return res.status(400).json({success: false, err})
      res.status(200).json({success: true, products})
    })
});



module.exports = router;
