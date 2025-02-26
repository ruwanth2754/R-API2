const gis = require('g-i-s');

// Perform the image search
function image(q) {
  return new Promise((resolve, reject) => {
    gis(q, (error, result) => {
      if (error) {
        reject("Error fetching images: " + error);
        return;
      }

      // Select the first 10 images from the result
      const images = result.slice(0, 10).map((image) => ({
        title: q,
        url: image.url,
      }));

      resolve(images); // Resolve with the images array
    });
  });
}
module.exports = {image}