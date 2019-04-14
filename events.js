// @ts-check
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

  //zoom and panning
  // alt + mouse click to pan 
  canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom = zoom + delta/200;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  })

  canvas.on('mouse:down', function(opt) {
    var evt = opt.e;
    if (evt.altKey === true) {
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    }
  });
  canvas.on('mouse:move', function(opt) {
    if (this.isDragging) {
      var e = opt.e;
      this.viewportTransform[4] += e.clientX - this.lastPosX;
      this.viewportTransform[5] += e.clientY - this.lastPosY;
      this.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
  });
  canvas.on('mouse:up', function(opt) {
    this.isDragging = false;
    this.selection = true;
  });


  // Add Text Event
  document.getElementById('textToCanvasBtn').addEventListener('click', function() {
    let textToAdd = document.querySelector('#textToCanvasInput').value;
    let textSize = document.querySelector('#textToCanvasSize').value;
    var text = new fabric.Text(textToAdd, { left: 100, top: 100, fontFamily: 'Impact', fontSize: textSize });
    canvas.add(text);
  }, false);
  
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
  
  //TODO: find a way to reset the brightness
  function onChangeBrightness(e) {
    let brightnessVal = document.querySelector('#brightness-slider').value;
    imageSettings.brightness = brightnessVal;
    imgInstance.filters.push(
      new fabric.Image.filters.Brightness({ brightness: brightnessVal }));
    imgInstance.applyFilters();
    canvas.renderAll();
  }
  
  //TODO: figure out the best min and max values
  function onChangeContrast(e) {
    let contrastVal = document.querySelector('#contrast-slider').value;
    imageSettings.contrast = contrastVal;
    imgInstance.filters.push(
      new fabric.Image.filters.Contrast({ contrast: contrastVal }));
    imgInstance.applyFilters();
    canvas.renderAll();
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
  