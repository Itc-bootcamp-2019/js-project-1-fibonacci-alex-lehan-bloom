// The below function can be used instead of onclick

function buttonClicked() {
  let button = document.getElementById("button");
  button.addEventListener("click", () => {
    fibonacciX = document.getElementById("inputField").value;
    fibonacci(fibonacciX);
  });
}

// Fibonacci calculated without recurision
function fibonacci(fibonacciX) {
  let fibList = [0, 1];
  let fibonacciY;
  for (i = 1; i < fibonacciX; i++) {
    fibonacciY = fibList[fibList.length - 1] + fibList[fibList.length - 2];
    fibList.push(fibonacciY);
  }
  document.getElementById("y").innerText = fibonacciY;
}

// Fibonacci calculated via recursion
function recursiveFibonacci(x) {
  //base case.
  if (x === 1 || x === 0) return x;
  //recursive case.
  else {
    return recursiveFibonacci(x - 2) + recursiveFibonacci(x - 1);
  }
}

// Detects button click using onclick=buttonClick()
function buttonClicked() {
  fibonacciX = document.getElementById("inputField").value;
  document.getElementById("y").innerText = recursiveFibonacci(fibonacciX);
}
