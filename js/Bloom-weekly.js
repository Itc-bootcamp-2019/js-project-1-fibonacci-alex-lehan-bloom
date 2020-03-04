// Detects when button is clicked. When button is clicked, we iniate getYFromServer().
let button = document.getElementById("button");
button.addEventListener("click", getYFromServer);

// Send X to remote server and get back Y. We display Y to the user OR an error if they entered something wrong.
function getYFromServer() {
  // Remove items left over from any previous runs of the function (e.g. alerts, the last y number, etc.)
  hideAlert();
  document.getElementById("y").innerText = "";
  document.getElementById("forty-two-error").innerText = "";
  // Start processing of X
  showSpinner();
  fibonacciX = document.getElementById("inputField").value;
  // Num entered by user can't be higher than 50
  if (fibonacciX > 50) {
    let alert = document.getElementById("alert");
    showAlert();
    alert.innerText = "Can't be larger than 50.";
    hideSpinner();
    // Num entered by user can't be lower than 1
  } else if (fibonacciX < 1) {
    let alert = document.getElementById("alert");
    showAlert();
    alert.innerText = "Can't be less than 1.";
    hideSpinner();
  } else {
    fetch("http://localhost:5050/fibonacci/" + fibonacciX)
      .then(response => {
        // This starts handling for the '42' error. The 42 error returns a 400.
        // If a user enters 42, we must return the data as Text. Otherwise, we return it as an Object.
        if (response.status === 400) {
          hideSpinner();
          console.log("text");
          return response.text();
        } else {
          console.log("json");
          return response.json();
        }
      })
      .then(data => {
        // If the data is text, we print the text to the user as an error.
        // If data is an object, everything has gone succesfully and we print the Y number to the user.
        console.log(data);
        if (typeof data === "object" && data !== null) {
          let y = data.result;
          hideSpinner();
          document.getElementById("y").innerText = y;
          console.log("JSON");
        } else {
          hideSpinner();
          document.getElementById("forty-two-error").innerText =
            "Server Error: " + data;
          console.log("TEXT");
        }
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

// Show alert when user enters invalid X value into input field
function showAlert() {
  const alert = document.getElementById("alert");
  alert.className = "alert alert-danger show";
  const inputField = document.getElementById("inputField");
  inputField.className = "form-control red";
}

// Hide alert
function hideAlert() {
  const alert = document.getElementById("alert");
  alert.className = "";
  const inputField = document.getElementById("inputField");
  inputField.className = "form-control";
}
