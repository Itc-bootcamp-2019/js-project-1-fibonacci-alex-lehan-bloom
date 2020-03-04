// Detects when button is clicked. When button is clicked, we send iniate getYFromServer.
let button = document.getElementById("button");
button.addEventListener("click", getYFromServer);

// Milestone 5 with Fetch. Send X to remote server and get back Y. We display Y to the user.
function getYFromServer() {
  hideAlert();
  document.getElementById("y").innerText = "";
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
        if (!response.ok || (response.status = 400)) {
          console.log("40");
          document.getElementById("forty-two-error").innerText = "Server Error: 42 is the meaning of life";
        }
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

// Show alert user enters invalid X value into input field
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
