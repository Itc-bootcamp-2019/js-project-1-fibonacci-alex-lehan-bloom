// Function for figuring out fibonacci
function fibonacci(x) {
  let fibList = [0, 1];
  let fibonacciY = fibList[-1];
  for (i = 1; i < x; i++) {
    let previousTwoNumbers = fibList.slice(-2);
    fibonacciY = previousTwoNumbers[0] + previousTwoNumbers[1];
    fibList.push(fibonacciY);
  }
  document.getElementById("y").innerText = fibonacciY;
}

// Detects button click
let button = document.getElementById("button");
button.addEventListener("click", () => {
  fibonacciX = document.getElementById("inputField").value;
  fibonacci(fibonacciX);
});
