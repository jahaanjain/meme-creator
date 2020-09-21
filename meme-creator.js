var Jimp = require("jimp");
var path = require("path");

module.exports = function (options, callback) {
  try {
    let url = options.imageURL;
    let directory = "directory" in options ? options.directory : "./";
    let fileName = "fileName" in options ? options.fileName : "random";

    Jimp.read(url, (err, image) => {
      if (err)
        return callback({
          status: 400,
          error: "Invalid image URL",
        });
      const fileTypes = ["png", "jpg", "jpeg"];
      if (!fileTypes.includes(image.getExtension())) {
        return callback({
          status: 400,
          error: `Invalid image type, gif's are not allowed.`,
        });
      }
      if (image.bitmap.height < 100 || image.bitmap.width < 100) {
        image.scale(10);
      }
      const TOP_POS = 5;
      const BOTTOM_POS = image.bitmap.height - 45;

      Jimp.loadFont(path.join(__dirname, "/impact.fnt")).then((font) => {
        image.print(
          font,
          0,
          TOP_POS,
          {
            text: options.topText.toUpperCase(),
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          image.bitmap.width,
          image.bitmap.height
        );
        image.print(
          font,
          0,
          BOTTOM_POS,
          {
            text: options.bottomText.toUpperCase(),
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          image.bitmap.width,
          image.bitmap.height
        );
        if (fileName == "random") {
          let randNum = Math.floor(Math.random() * 1000000000 + 1);
          image.write(`${directory}meme_${randNum}.` + image.getExtension());
          return callback({
            status: 200,
            fileName: `${directory}meme_${randNum}.` + image.getExtension(),
          });
        } else {
          image.write(`${directory}${fileName}.` + image.getExtension());
          return callback({
            status: 200,
            fileName: `${directory}${fileName}.` + image.getExtension(),
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
    return callback({
      status: 400,
      error: "Something went wrong while creating image: " + error,
    });
  }
};
