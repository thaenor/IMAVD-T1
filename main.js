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
    left: 100,
    top: 100,
    angle: 30,
    opacity: 0.85
  });
  imgInstance.scale(0.1);
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

/** custom events:  */

// listen for mouse:move events
canvas.on('mouse:move', function(e) {
  // get the current mouse position
  var mouse = canvas.getPointer(e.e);
  var x = parseInt(mouse.x);
  var y = parseInt(mouse.y);

  // get the color array for the pixel under the mouse
  var px = ctx.getImageData(x, y, 1, 1).data;

  // report that pixel data
  let results = document.getElementById('selectedColor');
  results.innerHTML =
    'At [' +
    x +
    ' / ' +
    y +
    ']: Red/Green/Blue/Alpha = [' +
    px[0] +
    ' / ' +
    px[1] +
    ' / ' +
    px[2] +
    ' / ' +
    px[3] +
    ']';
});

// function rotate(event) {
//   rotation += 5;
//   rect.set({ angle: rotation });
//   canvas.renderAll();
// }

/** Color Picker */
//colorPicker.addEventListener('change', watchColorPicker, false);

function watchColorPicker(event) {
  document.getElementById('myColor').innerHTML = event.target.value;

  for (var i = 0; i < canvasWidth; i++) {
    for (var j = 0; j < canvasHeight; j++) {
      let px = ctx.getImageData(i, j, 1, 1).data;
      //compare RGB values
      console.log(
        'At [' +
          i +
          ' / ' +
          j +
          ']: Red/Green/Blue/Alpha = [' +
          px[0] +
          ' / ' +
          px[1] +
          ' / ' +
          px[2] +
          ' / ' +
          px[3] +
          ']'
      );
    }
  }
}

/** Slider Events */

function onChangeColorSlider(e) {
  console.log('input change');
}

function onChangeZoom(e) {
  console.log('input change');
}

function onChangeBrightness(e) {
  console.log('input change');
}

function onChangeContrast(e) {
  console.log('input change');
}

function onChangeGamma(e) {
  console.log('input change');
}

let redSlider = document
  .getElementById('red-slider')
  .addEventListener('change', onChangeColorSlider, false);
let greenSlider = document
  .getElementById('green-slider')
  .addEventListener('change', onChangeColorSlider, false);
let blueSlider = document
  .getElementById('blue-slider')
  .addEventListener('change', onChangeColorSlider, false);

let zoomLevel = document
  .getElementById('zoomLevel')
  .addEventListener('change', onChangeZoom, false);
let brightnessSlider = document
  .getElementById('brightness-slider')
  .addEventListener('change', onChangeBrightness, false);
let contrastSlider = document
  .getElementById('contrast-slider')
  .addEventListener('change', onChangeContrast, false);
let gammaSlider = document
  .getElementById('gamma-slider')
  .addEventListener('change', onChangeGamma, false);

document.getElementById('GrayscaleFilterBtn').addEventListener('click', function() {
  // add filter
  imgInstance.filters.push(new fabric.Image.filters.Grayscale());

  // apply filters and re-render canvas when done
  imgInstance.applyFilters();
  // add image onto canvas (it also re-render the canvas)
  canvas.add(imgInstance);
}, false);
/** END */
