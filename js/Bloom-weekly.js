// Detects when button is clicked. When button is clicked, we send iniate getYFromServer.
let button = document.getElementById("button");
button.addEventListener("click", getYFromServer);

// Milestone 5 with Fetch. Send X to remote server and get back Y. We display Y to the user.
function getYFromServer() {
  document.getElementById("y").innerText = "";
  showSpinner();
  fibonacciX = document.getElementById("inputField").value;
  if (fibonacciX < 0 || fibonacciX > 50) {
    let alert = document.getElementById("alert");
    alert.innerText = "This is a test.";
    hideSpinner();
  } else {
    fetch("http://localhost:5050/fibonacci/" + fibonacciX)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        let y = data.result;
        hideSpinner();
        document.getElementById("y").innerText = y;
      });
  }
}

// Show the spinner during API request
function showSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 8000);
}

// Hide spinner once API request has completed
function hideSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.className = "";
}
