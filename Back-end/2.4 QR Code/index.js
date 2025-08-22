import { input } from '@inquirer/prompts';
import qr from 'qr-image';
import { createWriteStream, writeFile } from 'fs';


const answer = await input({ message: 'Enter a url:' });
if (isValidUrl(answer)) {
    var qr_png = qr.image(answer, { type: 'png' });
    qr_png.pipe(createWriteStream('url_qr.png'));
    writeFile('url_userInput.txt', answer, (err) => {
        if (err) throw err;
        console.log('File saved!');
    });
} else {
    console.log("This is not a valid url!");
}

function isValidUrl(str) {
  const urlPattern = /^(https?:\/\/)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:\d+)?(\/\S*)?$/;
  return urlPattern.test(str);
}