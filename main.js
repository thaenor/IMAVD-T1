// @ts-check
// get references to the html canvas element & its context
// https://stackoverflow.com/questions/26776436/get-rgb-values-of-pixel-of-image-in-fabric-js-on-mouse-move
const canvas = new fabric.Canvas('c');
const canvasElement = document.getElementById('c');
const ctx = canvasElement.getContext('2d');
const canvasWidth = 300;
const canvasHeight = 150;
const imageSettings = {
  rotation: 0,
  brightness: 0,
  contrast: 0,
  gamma: 0,
  zoom: 100
};
const imageData = {
  name: '',
  location: '',
  size: 0,
  createDate: 0
};

let imgElement = new Image();
let imgInstance;
imgElement.crossOrigin = 'Anonymous';
imgElement.src =
  'http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/cat-icon.png';
imgElement.onload = function() {
  imgInstance = new fabric.Image(imgElement, {
    left: 10,
    top: 10,
    angle: 30,
    opacity: 0.85
  });
  imgInstance.scale(0.5);
  canvas.add(imgInstance);
};

// create a rectangle object
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20,
  angle: 45
});

canvas.add(rect);
