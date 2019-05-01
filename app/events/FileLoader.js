const FileSaver = require('file-saver');
const toBlob = require('canvas-toBlob');
const fs = require('fs');

document.getElementById('fileSelector').addEventListener('change', event => {
  const file = event.target.files[0];

  document.querySelector('#fileName').innerHTML = file.name;
  imageData.name;
  document.querySelector('#fileSize').innerHTML = formatBytes(file.size, 'MB');
  document.querySelector('#fileLocation').innerHTML = file.path;
  document.querySelector('#fileType').innerHTML = file.path.split('.').pop();
  document.querySelector(
    '#fileLastMod'
  ).innerHTML = file.lastModifiedDate.toLocaleString();

  // NOTE : this code works, but it doesn't add the image to the canvas yet
  // const imageBuffer = fs.readFileSync(file.path);
  // let importedImage = new Image();
  // importedImage.src = `data:image/png;base64,${imageBuffer.toString('base64')}`;
  // document.querySelector('body').appendChild(importedImage);
  // imagesInCanvas.push(new fabric.Image(importedImage, {
  //   left: 0,
  //   top: 0,
  //   angle: 0
  // }));
  // canvas.renderAll();
});

function formatBytes(a, b) {
  if (0 == a) return '0 Bytes';
  var c = 1024,
    d = b || 2,
    e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
}

document.getElementById('savebtn').addEventListener('click', event => {
  canvasElement.toBlob(function(blob) {
    saveAs(blob, 'myIMG.png');
  });
});
