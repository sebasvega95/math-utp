let bannerCanvas;
let bannerCtx;

const n = 10;
const outerPerSide = 5;

const maxSpeed = 0.1;
const minSpeed = 0.01;

let circles;
const radius = 10;
const circleColor = 'rgba(10, 141, 154, 0.3)';
const circleOutline = '#90caf9';
const edgeColor = '#90caf9';

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
function resize(canvas) {
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;
  if (width != canvas.width || height != canvas.height) {
    canvas.width = width;
    canvas.height = height;
  }
}

/**
 * Setup animation
 */
function startAnimation() {
  bannerCanvas = document.getElementById('banner-canvas');
  resize(bannerCanvas);
  bannerCtx = bannerCanvas.getContext('2d');

  const minX = radius;
  const maxX = bannerCanvas.width - radius;
  const minY = radius;
  const maxY = bannerCanvas.height - radius;

  circles = [];
  for (let i = 0; i < n; i++) {
    circles.push({
      x: randRange(minX, maxX),
      y: randRange(minY, maxY),
      dx: randRange(minSpeed, maxSpeed),
      dy: randRange(minSpeed, maxSpeed),
      move: true,
    });
  }

  for (let i = 0; i < outerPerSide; i++) {
    circles.push({
      x: randRange(-100, -minX),
      y: randRange(minY, maxY),
      dx: randRange(minSpeed, maxSpeed),
      dy: randRange(minSpeed, maxSpeed),
      move: false,
    });
  }

  for (let i = 0; i < outerPerSide; i++) {
    circles.push({
      x: randRange(bannerCanvas.width + radius, maxX + 100),
      y: randRange(minY, maxY),
      dx: randRange(minSpeed, maxSpeed),
      dy: randRange(minSpeed, maxSpeed),
      move: false,
    });
  }

  for (let i = 0; i < outerPerSide; i++) {
    circles.push({
      x: randRange(minX, maxX),
      y: randRange(-100, -minY),
      dx: randRange(minSpeed, maxSpeed),
      dy: randRange(minSpeed, maxSpeed),
      move: false,
    });
  }

  for (let i = 0; i < outerPerSide; i++) {
    circles.push({
      x: randRange(minX, maxX),
      y: randRange(bannerCanvas.height + radius, maxY + 100),
      dx: randRange(minSpeed, maxSpeed),
      dy: randRange(minSpeed, maxSpeed),
      move: false,
    });
  }

  animate();
}

/**
 * Draw cool background animation
 */
function animate() {
  bannerCtx.clearRect(0, 0, bannerCanvas.width, bannerCanvas.height);
  resize(bannerCanvas);

  let points = [];
  circles.forEach((c) => {
    points.push([c.x, c.y]);
  });
  let delaunay = new Delaunay(points);
  let triangles = delaunay.triangulate();

  for (let i = 0; i < triangles.length; i += 3) {
    let p1 = triangles[i];
    let p2 = triangles[i + 1];
    let p3 = triangles[i + 2];

    bannerCtx.beginPath();
    bannerCtx.moveTo(p1[0], p1[1]);
    bannerCtx.lineTo(p2[0], p2[1]);
    bannerCtx.lineTo(p3[0], p3[1]);
    bannerCtx.moveTo(p2[0], p2[1]);
    bannerCtx.lineTo(p3[0], p3[1]);
    bannerCtx.strokeStyle = edgeColor;
    bannerCtx.stroke();
  }

  circles.forEach((c) => {
    bannerCtx.beginPath();
    bannerCtx.arc(c.x, c.y, radius, 0, 2 * Math.PI);
    bannerCtx.fillStyle = circleColor;
    bannerCtx.fill();
    bannerCtx.lineWidth = 1;
    bannerCtx.strokeStyle = circleOutline;
    bannerCtx.stroke();

    if (c.move) {
      c.x += c.dx;
      c.y += c.dy;
    }

    if (c.move && (c.x + radius > bannerCanvas.width || c.x - radius < 0))
      c.dx *= -1;
    if (c.move && (c.y + radius > bannerCanvas.height || c.y - radius < 0))
      c.dy *= -1;
  });
  requestAnimationFrame(animate);
}

startAnimation();
