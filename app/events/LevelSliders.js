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
      new fabric.Image.filters.Brightness({ brightness: brightnessVal })
    );
    imgInstance.applyFilters();
    canvas.renderAll();
  }
  
  //TODO: figure out the best min and max values
  function onChangeContrast(e) {
    let contrastVal = document.querySelector('#contrast-slider').value;
    imageSettings.contrast = contrastVal;
    imgInstance.filters.push(
      new fabric.Image.filters.Contrast({ contrast: contrastVal })
    );
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
  
  document.getElementById('GrayscaleFilterBtn').addEventListener(
    'click',
    function() {
      // add filter
      imgInstance.filters.push(new fabric.Image.filters.Grayscale());
  
      // apply filters and re-render canvas when done
      imgInstance.applyFilters();
      // add image onto canvas (it also re-render the canvas)
      canvas.add(imgInstance);
    },
    false
  );