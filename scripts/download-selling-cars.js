import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://plus.unsplash.com/premium_photo-1661405668601-fa0764ea03f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNhciUyMHNhbGV8ZW58MHx8MHx8fDA%3D';
const filename = 'selling-cars.jpg';

const downloadImage = () => {
  const filepath = path.join(__dirname, '../public/info', filename);
  const file = fs.createWriteStream(filepath);

  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename} successfully!`);
    });
  }).on('error', (err) => {
    fs.unlink(filepath, () => {});
    console.error('Error downloading image:', err);
  });
};

downloadImage();
