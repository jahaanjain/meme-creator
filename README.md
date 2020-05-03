Overview:

This NPM module is for developers to create memes using an image URL, and save it into their specified directory.

Example meme:
![Meme](/memes/my_meme.jpeg)

Example code and usage:
**You must put impact.fnt AND impact.png into the same directory**
```javascript
var memeCreator = require('meme-creator');

let options = {
    imageURL: 'https://puu.sh/FFRao/b67dde72b7.jpg', // URL to image
    topText: 'Daddy, what are clouds made of?', // top text of meme
    bottomText: 'Linux servers, mostly', // bottom text of meme
    directory: './memes/', // where to save memes
    fileName: 'me_meme', // change to 'random' for a random file name
    fontDirectory: './impact.fnt' // the location of impact.fnt (impact.png should be in the same place)
}

memeCreator(options, function(res, error) {
    if(error) throw new Error(error)
    console.log('You can view your meme by going to ' + res.fileName);
});
```