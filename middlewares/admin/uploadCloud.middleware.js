const cloudinary = require('cloudinary');
const streamifier = require("streamifier");
 cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret: process.env.api_secret
    });
 module.exports. upload = async(req, res, next) =>{
  if (!req.file) {
      return next();
  }

  let streamUpload = (req) => {
    return new Promise((resolve, reject) => { 
        let stream = cloudinary.uploader.upload_stream(
          (result, error) => {
            if (result) {
              resolve(result); 
            } else {
              reject(error);  
            }
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
    });
  };

  try {
      let result = await streamUpload(req);

     
      console.log(result);

      req.body.thumbnail = result.secure_url;
      next();
  } 
  catch (err) {
     
      console.log(err);
      next(err);
  }
}
module.exports. uploadAvatar = async(req, res, next) =>{
  if (!req.file) {
      return next();
  }

  let streamUpload = (req) => {
    return new Promise((resolve, reject) => { 
        let stream = cloudinary.uploader.upload_stream(
          (result, error) => {
            if (result) {
              resolve(result); 
            } else {
              reject(error);  
            }
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
    });
  };

  try {
      let result = await streamUpload(req);

     
      console.log(result);

      req.body.avatar = result.secure_url;
      next();
  } 
  catch (err) {
     
      console.log(err);
      next(err);
  }
}
module.exports. uploadLogo = async(req, res, next) =>{
  if (!req.file) {
      return next();
  }

  let streamUpload = (req) => {
    return new Promise((resolve, reject) => { 
        let stream = cloudinary.uploader.upload_stream(
          (result, error) => {
            if (result) {
              resolve(result); 
            } else {
              reject(error);  
            }
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
    });
  };

  try {
      let result = await streamUpload(req);

     
      console.log(result);

      req.body.logo = result.secure_url;
      next();
  } 
  catch (err) {
     
      console.log(err);
      next(err);
  }
}