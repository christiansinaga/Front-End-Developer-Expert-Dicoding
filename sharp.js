/* eslint-disable no-await-in-loop */
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const resizeAndSaveImage = async (imagePath, destinationPath, width) => {
  try {
    await sharp(imagePath).resize(width).toFile(destinationPath);
    console.log(`Image resized and saved to ${destinationPath}`);
  } catch (error) {
    console.error(`Error while resizing and saving image ${imagePath}:`, error);
  }
};

const main = async () => {
  const targetDir = path.resolve(__dirname, 'src/public/images/heros');
  const destinationDir = path.resolve(__dirname, 'dist/images/heros');

  try {
    await fs.mkdir(destinationDir, { recursive: true });

    const imageFiles = await fs.readdir(targetDir);

    // eslint-disable-next-line no-restricted-syntax
    for (const image of imageFiles) {
      const imageFilePath = path.join(targetDir, image);
      const imageFileName = path.parse(image).name;

      const largeImageDest = path.join(destinationDir, `${imageFileName}-large.jpg`);
      const smallImageDest = path.join(destinationDir, `${imageFileName}-small.jpg`);

      await resizeAndSaveImage(imageFilePath, largeImageDest, 1350);
      await resizeAndSaveImage(imageFilePath, smallImageDest, 600);
    }

    console.log('Image resizing and saving completed successfully.');
  } catch (error) {
    console.error('Error while processing images:', error);
  }
};

main();
