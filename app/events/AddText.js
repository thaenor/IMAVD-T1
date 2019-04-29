// Add Text Event
document.getElementById('textToCanvasBtn').addEventListener(
    'click',
    function() {
      let textToAdd = document.querySelector('#textToCanvasInput').value;
      let textSize = document.querySelector('#textToCanvasSize').value;
      var text = new fabric.Text(textToAdd, {
        left: 100,
        top: 100,
        fontFamily: 'Impact',
        fontSize: textSize
      });
      canvas.add(text);
    },
    false
  );