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