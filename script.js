const wheelCanvas = document.getElementById('wheelCanvas');
const ctx = wheelCanvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const demoPointsElem = document.getElementById('demo-points');
const totalProfitElem = document.getElementById('total-profit');
const feeElem = document.getElementById('fee');
const betSizeElem = document.getElementById('bet-size');

let demoPoints = 1000;
let totalProfit = 0;
let fee = 0;

const wheelOptions = [
  { color: '#ff9999', value: 0.9 },
  { color: '#99ff99', value: 1.1 },
  { color: '#9999ff', value: 0.8 },
  { color: '#ffff99', value: 1.2 },
  { color: '#99ffff', value: 1.3 },
  { color: '#ff99ff', value: 0.7 },
  
];

function drawWheel() {  const centerX = wheelCanvas.width / 2;
const centerY = wheelCanvas.height / 2;
const radius = Math.min(centerX, centerY) - 10;
const arc = (2 * Math.PI) / wheelOptions.length;

ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

for (let i = 0; i < wheelOptions.length; i++) {
  const startAngle = i * arc;
  const endAngle = startAngle + arc;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = wheelOptions[i].color;
  ctx.fill();
}
}

function spinWheel() {
const betSize = parseInt(betSizeElem.value);
if (betSize > demoPoints) {
  alert('Not enough demo points!');
  return;
}

spinButton.disabled = true;

demoPoints -= betSize;
demoPointsElem.textContent = demoPoints;

const targetRotation = Math.random() * 2 * Math.PI + 10 * Math.PI;
const stepCount = 200;
const rotationStep = targetRotation / stepCount;
let currentStep = 0;

function rotateWheel() {
  ctx.translate(wheelCanvas.width / 2, wheelCanvas.height / 2);
  ctx.rotate(rotationStep);
  ctx.translate(-wheelCanvas.width / 2, -wheelCanvas.height / 2);
  drawWheel();

  currentStep++;

  if (currentStep < stepCount) {
    requestAnimationFrame(rotateWheel);
  } else {
    const resultIndex = Math.floor(wheelOptions.length * ((targetRotation - (currentStep - 1) * rotationStep) % (2 * Math.PI)) / (2 * Math.PI));
    const resultMultiplier = wheelOptions[resultIndex].value;
    const winnings = betSize * resultMultiplier;
    const winningsFee = winnings * 0.01;

    demoPoints += winnings - winningsFee;
    demoPointsElem.textContent = demoPoints;

    totalProfit += winnings - betSize - winningsFee;
    totalProfitElem.textContent = totalProfit.toFixed(2);

    fee += winningsFee;
    feeElem.textContent = fee.toFixed(2);

    spinButton.disabled = false;
  }
}

requestAnimationFrame(rotateWheel);
}

drawWheel();

 
