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
  canvas.centerObject(imgInstance);
  canvas.renderAll();
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


// set to the event when the user pressed the mouse button down
var mouseDown;
var cropOn = false;

// only allow one crop. turn it off after that
var disabled = true;
var rectangle = new fabric.Rect({
  //left: 100,
  //top: 100,
  fill: 'transparent',
  originX: 'left',
  originY: 'top',
  stroke: '#ccc',
  strokeDashArray: [2, 2],
  opacity: 1,
  width: 1,
  height: 1
});


var container = canvasElement.getBoundingClientRect();
canvas.add(rectangle);

var mousex = 0;
var mousey = 0;
var crop = false;
// capture the event when the user clicks the mouse button down
canvas.on("mouse:down", function (event) {
  if (!disabled) {
    rectangle.width = 2;
    rectangle.height = 2;
    rectangle.left = event.e.pageX - container.left;
    rectangle.top = event.e.pageY - container.top;
    rectangle.visible = true;
    mouseDown = event.e;
    canvas.bringToFront(rectangle);
  }
});

// draw the rectangle as the mouse is moved after a down click
canvas.on("mouse:move", function (event) {
  if (mouseDown && !disabled) {
    /*var secondCanvas = document.createElement('canvas');
    var ctx = secondCanvas.getContext('2d');
    secondCanvas.width = rectangle.width;
    secondCanvas.height = rectangle.height;
    document.body.appendChild(secondCanvas);
    ctx.drawImage(canvas,
      10,10,rectangle.width,rectangle.height,  // clip just the cropping rectangle from the first canvas
      0,0,rectangle.width,rectangle.height   // draw just the cropped part onto the first canvas
  );*/
    rectangle.width = event.e.pageX - mouseDown.pageX;
    rectangle.height = event.e.pageY - mouseDown.pageY;
    canvas.renderAll();
  }
});

//ctx.fillRect(10,10,30,30);
// when mouse click is released, end cropping mode
canvas.on("mouse:up", function () {
  mouseDown = null;
});

var buttonApply = document.getElementById('applyCrop');
buttonApply.style.visibility = 'hidden';
var buttonDismiss = document.getElementById('dismissCrop');
buttonDismiss.style.visibility = 'hidden';

$('#cropB').on('click', function () {
  buttonApply.style.visibility = 'visible';
  buttonDismiss.style.visibility = 'visible';
  disabled = false;
});

$('#applyCrop').on('click', function () {
  buttonApply.style.visibility = 'hidden';
  buttonDismiss.style.visibility = 'hidden';
  imgInstance.selectable = true;
  disabled = true;
  rectangle.visible = false;
  var cropped = new Image();
  cropped.src = canvas.toDataURL({
    left: rectangle.left,
    top: rectangle.top,
    width: rectangle.width,
    height: rectangle.height
  });
  cropped.onload = function () {
    canvas.clear();
    imgInstance = new fabric.Image(cropped);
    imgInstance.left = rectangle.left;
    imgInstance.top = rectangle.top;
    imgInstance.setCoords();
    canvas.add(imgInstance);
    canvas.renderAll();
  };
});

$('#dismissCrop').on('click', function () {
  buttonApply.style.visibility = 'hidden';
  buttonDismiss.style.visibility = 'hidden';
  disabled = true;
});

$('#cropC').on('click', function () {
  canvas.getElement().toBlob(function (blob) {
    saveAs(blob, 'myimage.png');
  })
});