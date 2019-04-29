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