document.addEventListener("DOMContentLoaded", function () {
  const roadContainer = document.getElementById("road-container");
  const maxArea = document.getElementById("max-area");
  const car = document.getElementById("car");

  let maxAreaWidth = maxArea.offsetWidth;
  let maxAreaHeight = maxArea.offsetHeight;

  let carXPosition = maxAreaWidth / 2 - car.offsetWidth / 2;
  let carYPosition = 0;

  const carSpeed = 2;
  const CarSidesSpeed = 1.5;
  let enemyCarSpeed = 4; // Initial enemy car speed

  const keysPressed = {
    a: false,
    d: false,
    w: false,
    s: false,
  };

  // Function to update game dimensions based on screen size
  function updateGameDimensions() {
    maxAreaWidth = maxArea.offsetWidth;
    maxAreaHeight = maxArea.offsetHeight;

    // Ensure the car stays within the updated boundaries
    carXPosition = Math.max(0, Math.min(maxAreaWidth - car.offsetWidth, carXPosition));
    carYPosition = Math.max(0, Math.min(maxAreaHeight - car.offsetHeight, carYPosition));
  }

  // Update game dimensions initially and when the screen is resized
  updateGameDimensions();
  window.addEventListener("resize", updateGameDimensions);

  function updateCarPosition() {
    let deltaX = 0;
    let deltaY = 0;

    if (keysPressed["a"]) {
      deltaX -= CarSidesSpeed;
    }
    if (keysPressed["d"]) {
      deltaX += CarSidesSpeed;
    }
    if (keysPressed["w"]) {
      deltaY += carSpeed;
    }
    if (keysPressed["s"]) {
      deltaY -= carSpeed;
    }

    carXPosition += deltaX;
    carYPosition += deltaY;

    carXPosition = Math.max(0, Math.min(maxAreaWidth - car.offsetWidth, carXPosition));
    carYPosition = Math.max(0, Math.min(maxAreaHeight - car.offsetHeight, carYPosition));

    car.style.left = carXPosition + "px";
    car.style.bottom = carYPosition + "px";
  }

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (keysPressed[key] === false) {
      keysPressed[key] = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();

    keysPressed[key] = false;
  });

  function animateCar() {
    updateCarPosition();
    requestAnimationFrame(animateCar);
  }
  animateCar();

  const carImages = [
    "./pics/car1.png",
    "./pics/motor.png",
    "./pics/truck.png",
    "./pics/longtruck.png",
    "./pics/car3.png",
    "./pics/car5.png",
    // Add more paths as needed
  ];

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createRandomEnemyCar() {
    const randomCarIndex = getRandomNumber(0, carImages.length - 1);
    const randomCarImage = carImages[randomCarIndex];

    const enemyCar = document.createElement("div");
    enemyCar.className = "enemy-car";
    enemyCar.style.backgroundImage = `url(${randomCarImage})`;

    const maxXPosition = maxAreaWidth - 100;
    const randomXPosition = getRandomNumber(0, maxXPosition);

    enemyCar.style.left = randomXPosition + "px";
    enemyCar.style.top = -(enemyCar.offsetHeight + getRandomNumber(100, 300)) + "px";

    maxArea.appendChild(enemyCar);

    function moveEnemyCar() {
      const currentYPosition = parseInt(enemyCar.style.top, 10);
      if (currentYPosition > maxAreaHeight) {
        enemyCar.remove();
      } else {
        enemyCar.style.top = currentYPosition + enemyCarSpeed + "px";
        requestAnimationFrame(moveEnemyCar);
      }
    }

    moveEnemyCar();
  }
  
  setInterval(createRandomEnemyCar, 180); // Adjust the interval as needed

  let score = 0; // Initialize the score variable

  // Function to update the score
  function updateScore() {
    score += 1; // Increment the score
    // Display the score in the HTML element with id "score-display"
    document.getElementById("score-display").textContent = "Score: " + score;
  }

  // Call updateScore function at a regular interval to keep counting the score
  setInterval(updateScore, 100); // Adjust the interval as needed

  // ... (Rest of your code)
  
  // Call createRandomEnemyCar function to start generating enemy cars
  createRandomEnemyCar();

});
