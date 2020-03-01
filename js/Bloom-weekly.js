let fibonacciX = 0;
let fibonacciY = 0;
let fibList = [0, 1];
let previousTwoNumbers = [];
let userInput = 0;

function fibonacci(x) {
  fibonacciX = x;
  fibonacciY = fibList[-1];
  for (i = 1; i < x; i++) {
    previousTwoNumbers = fibList.slice(-2);
    fibonacciY = previousTwoNumbers[0] + previousTwoNumbers[1];
    fibList.push(fibonacciY);
  }
  document.getElementById("x").innerHTML = fibonacciX;
  document.getElementById("y").innerHTML = fibonacciY;
}

let button = document.getElementById("button");
button.addEventListener("click", () => {
  userInput = document.getElementById("inputField").value;
  fibonacci(userInput);
  fibList = [0, 1];
});

// fibonacci(17);
