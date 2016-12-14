let circlesCanvas;
let circlesCtx;

/**
 * Draw cool backgrpund animation
 * @param {number} min
 * @param {number} max
 * @return {number} Random number between min and max
 */
function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Resize canvas
 * @param {object} canvas
 */
function resize() {
  let width = circlesCanvas.clientWidth;
  let height = circlesCanvas.clientHeight;
  if (width != circlesCanvas.width || height != circlesCanvas.height) {
    circlesCanvas.width = width;
    circlesCanvas.height = height;
  }
}

/**
 * Setup animation
 */
function startDrawingCircles() {
  circlesCanvas = document.getElementById('fake-circles-canvas');
  circlesCtx = circlesCanvas.getContext('2d');
}

/**
 * Draw fake circles
 */
function drawCircles() {
  let w = circlesCanvas.width;
  let h = circlesCanvas.height;

  circlesCtx.clearRect(0, 0, w, h);
  circlesCtx.strokeStyle = 'red';

  let radii = (w + h) / 8;
  let sides = +$('#numberOfSides option:selected').val();

  let points = polygon(circlesCtx, w / 2, h / 2, radii, sides);
  let maxDist = [];

  points.forEach((p, i) => {
    maxDist[i] = -1;
    points.forEach((q) => {
      let r = Math.hypot(p.x - q.x, p.y - q.y);
      maxDist[i] = Math.max(maxDist[i], r);
    });
  });

  let endpoints = [];
  points.forEach((p, i) => {
    endpoints[i] = [];
    console.log(p.x, p.y);
    points.forEach((q, j) => {
      let r = Math.hypot(p.x - q.x, p.y - q.y);
      if (Math.abs(r - maxDist[i]) < 1E-10) {
        console.log('->', q.x, q.y);
        let ang = Math.atan2(q.y - p.y, q.x - p.x);
        ang = ang < 0 ? ang + 2 * Math.PI : ang;
        endpoints[i].push(ang);
      }
    });
  });

  circlesCtx.strokeStyle = 'blue';

  endpoints.forEach((ep, i) => {
    let c = points[i];
    let minAng = Math.min(...ep);
    let maxAng = Math.max(...ep);

    circlesCtx.beginPath();
    circlesCtx.arc(c.x, c.y, maxDist[i], minAng, maxAng);
    circlesCtx.stroke();
  });
}

function polygon(ctx, x, y, radius, sides) {
  ctx.beginPath();
  ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));

  let points = [];
  for (let i = 1; i <= sides; i += 1) {
    let xx = x + radius * Math.cos(i * 2 * Math.PI / sides);
    let yy = y + radius * Math.sin(i * 2 * Math.PI / sides);

    ctx.lineTo(xx, yy);
    points.push({ x: xx, y: yy });
  }

  ctx.lineWidth = 1;
  ctx.stroke();

  return points;
}

requestAnimationFrame(resize);
startDrawingCircles();
