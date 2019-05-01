const FileSaver = require('file-saver');
const toBlob = require('canvas-toBlob');

document.getElementById('fileSelector').addEventListener('change', event => {
  const file = event.target.files[0];

  document.querySelector('#fileName').innerHTML = file.name;
  imageData.name;
  document.querySelector('#fileSize').innerHTML = formatBytes(file.size, 'MB');
  document.querySelector('#fileLocation').innerHTML = file.path;
  document.querySelector(
    '#fileLastMod'
  ).innerHTML = file.lastModifiedDate.toLocaleString();
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
    canvasElement.toBlob(function(blob){
		saveAs(blob, "myIMG.png");
	});
});
