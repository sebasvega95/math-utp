let ctx = document.getElementById('background-canvas').getContext('2d');
let rectColor = ['#3949ab', '#26a69a'];
let rectIndex = 0;

/**
 * Draw cool backgrpund animation
 * @param {object} canvas
 */
function resize(canvas) {
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;
  if (width != canvas.width || height != canvas.height) {
    canvas.width = width;
    canvas.height = height;
  }
}

/**
 * Draw cool background animation
 * @param {number} time
 */
function render(time) {
  time *= 0.001;
  resize(ctx.canvas);
  ctx.save();
  let w = ctx.canvas.width;
  let h = ctx.canvas.height;
  let hw = w / 2;
  let hh = h / 2;
  ctx.clearRect(0, 0, w, h);
  ctx.translate(hw, hh);
  ctx.rotate(time * 0.1);
  for (let i = 0; i < 100; i++) {
    ctx.rotate(Math.sin(time * 0.1) * 0.2);
    ctx.strokeStyle = rectColor[rectIndex++ % 2];
    ctx.strokeRect(-hw, -hh, w, h);
    ctx.scale(0.9, 0.9);
  }
  ctx.restore();

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
