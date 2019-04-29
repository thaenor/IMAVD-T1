const $ = require('jQuery');
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
canvas.on('mouse:down', function(event) {
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
canvas.on('mouse:move', function(event) {
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
canvas.on('mouse:up', function() {
  mouseDown = null;
});

var buttonApply = document.getElementById('applyCrop');
buttonApply.style.visibility = 'hidden';
var buttonDismiss = document.getElementById('dismissCrop');
buttonDismiss.style.visibility = 'hidden';

$('#cropB').on('click', function() {
  buttonApply.style.visibility = 'visible';
  buttonDismiss.style.visibility = 'visible';
  disabled = false;
});

$('#applyCrop').on('click', function() {
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
  cropped.onload = function() {
    canvas.clear();
    imgInstance = new fabric.Image(cropped);
    imgInstance.left = rectangle.left;
    imgInstance.top = rectangle.top;
    imgInstance.setCoords();
    canvas.add(imgInstance);
    canvas.renderAll();
  };
});

$('#dismissCrop').on('click', function() {
  buttonApply.style.visibility = 'hidden';
  buttonDismiss.style.visibility = 'hidden';
  disabled = true;
});

$('#cropC').on('click', function() {
  canvas.getElement().toBlob(function(blob) {
    saveAs(blob, 'myimage.png');
  });
});