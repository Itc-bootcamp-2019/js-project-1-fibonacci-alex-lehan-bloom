// Function for figuring out fibonacci
function fibonacci(fibonacciX) {
  let fibList = [0, 1];
  let fibonacciY;
  for (i = 1; i < fibonacciX; i++) {
    fibonacciY = fibList[fibList.length - 1] + fibList[fibList.length - 2];
    fibList.push(fibonacciY);
  }
  document.getElementById("y").innerText = fibonacciY;
}

// The below function can be used instead of onclick

// function buttonClicked() {
//   let button = document.getElementById("button");
//   button.addEventListener("click", () => {
//     fibonacciX = document.getElementById("inputField").value;
//     fibonacci(fibonacciX);
//   });
// }

// Detects button click using onclick=buttonClick()
function buttonClicked() {
  fibonacciX = document.getElementById("inputField").value;
  fibonacci(fibonacciX);
}
