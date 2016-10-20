(function(){

  'use strict';

  var canvas = document.getElementById('js-canvas'),
      context = canvas.getContext('2d');

  var image, mask;

  var index = 10;

  function transition() {
    var gradient;

    setTimeout(transition, 100);

    if (index <= 0) {
      index = 10;
    }

    --index;

    context.clearRect(0, 0, 640, 480);

    context.globalCompositeOperation = 'source-over';
    context.drawImage(mask, 64 * index, 0, 640, 480);

    context.globalCompositeOperation = 'source-out';
    context.drawImage(image, 0, 0, 640, 480);
  }

  Promise
    .resolve()
    .then(function() {
      return Promise.all([
        createGradientMask(),
        loadImage('cat.jpg'),
      ]);
    })
    .then(function(images) {
      mask = images[0];
      image = images[1];
    })
    .then(function() {
      setTimeout(transition, 0);
    })
    .catch(function(err) {
      console.error(err);
    });

  //----------------------------------------------------------------------------

  function createGradientMask() {
    var maskCanvas = document.createElement('canvas'),
        maskContext = maskCanvas.getContext('2d'),
        gradient;

    maskCanvas.width = 640;
    maskCanvas.height = 480;

    gradient = maskContext.createLinearGradient(0, 0, 640, 0);

    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

    maskContext.fillStyle = gradient;
    maskContext.fillRect(0, 0, 640, 480);

    return loadImage(maskCanvas.toDataURL());
  }

  //----------------------------------------------------------------------------

  var colors = ['#fff', '#ccc'],
      colorsIndex = 0;

  setInterval(function() {
    document.body.style.backgroundColor = colors[
      (colorsIndex === 0) ? (colorsIndex = 1) : (colorsIndex = 0)
    ];
  }, 3000);

}());
