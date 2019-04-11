// create a wrapper around native canvas element (with id="c")
var canvasWidth = 300;
var canvasHeight = 150;
var canvas = new fabric.Canvas('c');
var imgElement = document.getElementById('main-image');
// get references to the html canvas element & its context
// https://stackoverflow.com/questions/26776436/get-rgb-values-of-pixel-of-image-in-fabric-js-on-mouse-move
var canvasElement = document.getElementById('c');
var ctx = canvasElement.getContext("2d");
var rotation = 0;


fabric.Image.fromURL('http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/cat-icon.png', function(oImg) {
  // scale image down, and flip it, before adding it onto canvas
  oImg.scale(0.5).set('flipX, true');
  canvas.add(oImg);
},{ crossOrigin: 'Anonymous' });


// create a rectangle object
// var rect = new fabric.Rect({
//   left: 100,
//   top: 100,
//   fill: 'red',
//   width: 20,
//   height: 20,
//   angle: 45,
// });

// "add" rectangle onto canvas
// canvas.add(rect);







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
  results.innerHTML = 'At [' + x + ' / ' + y + ']: Red/Green/Blue/Alpha = [' + px[0] + ' / ' + px[1] + ' / ' + px[2] + ' / ' + px[3] + ']';

});

function rotate(event) {
  rotation += 5;
  rect.set({ angle: rotation });
  canvas.renderAll();  
}

/** Color Picker */
colorPicker.addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
  document.getElementById("myColor").innerHTML = event.target.value;
  

  for (var i = 0; i < canvasWidth; i++) {
    for (var j = 0; j < canvasHeight; j++) {
      let px = ctx.getImageData(i, j, 1, 1).data;
      //compare RGB values
      console.log('At [' + i + ' / ' + j + ']: Red/Green/Blue/Alpha = [' + px[0] + ' / ' + px[1] + ' / ' + px[2] + ' / ' + px[3] + ']');
    }
  }

}
/** END */






