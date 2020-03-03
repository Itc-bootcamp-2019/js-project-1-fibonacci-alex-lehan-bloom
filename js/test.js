// The below function can be used instead of onclick

function buttonClicked() {
  let button = document.getElementById("button");
  button.addEventListener("click", () => {
    fibonacciX = document.getElementById("inputField").value;
    fibonacci(fibonacciX);
  });
}
