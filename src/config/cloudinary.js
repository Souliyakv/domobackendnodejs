
import Jimp from "jimp";

export const UploadImagee = (imageFire) => {
  try {
    const buffer = Buffer.from(imageFire.split(",")[1], "base64");
    let firePath = `./uploads/images/${Date.now()}.jpg`;
    // let firePath = path.join(__dirname,`/../../../uploads/images/${Date.now()}.jpg`);
    Jimp.read(buffer, (err, result) => {
      if (err) throw err;
      result.write(firePath);
    });
    return firePath;
  } catch (error) {
    return console.log(error);
  }
};

export const DeleteImage = (imageFire) => {
  try {
    // Read the image file and return a Jimp image object
    Jimp.read(imageFire, (err, image) => {
      if (err) {
        console.error(err);
        return;
      }

      // Delete the image file
      image.delete((err) => {
        if (err) {
          console.error(err);
          return;
        }
       return true;
      });
    });
  } catch (error) {
    return console.log(error);
  }
};
