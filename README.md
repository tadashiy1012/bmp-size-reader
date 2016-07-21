# bmp-size-reader
Gets the height and width of the bmp image

## Installation
`$ npm install bmp-size-reader`

## Example
```JavaScript
const reader = require('bmp-size-reader');
reader(tgtFilePath).then((result) => {
  console.log(result); // [width, height]
});
```

## License
MIT