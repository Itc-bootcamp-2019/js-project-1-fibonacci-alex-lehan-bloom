// Displays previous results from server.
function previousResults() {
  showSpinnerTwo();
  fetch("http://localhost:5050/getFibonacciResults")
    .then(response => {
      return response.json();
    })
    .then(data => {
      for (let i = 0; i < data.results.length; i++) {
        let results = document.getElementById("results-list");
        let date = new Date(data.results[i].createdDate).toUTCString();
        let newLi = document.createElement("li");
        newLi.innerHTML = `The fibonacci Of <span class="bold">${data.results[i].number}</span> is <span class="bold">${data.results[i].result}</span>. Calculated at: ${date}`;
        results.appendChild(newLi);
      }
      hideSpinnerTwo();
    });
}

// On button click, we initate checkNumFromUser().
let button = document.getElementById("button");
button.addEventListener("click", checkNumFromUser);

// Function to validate number inputted by user
function checkNumFromUser() {
  // Remove items left over from any previous runs of the function (e.g. alerts, the last y number, etc.)
  hideAlert();
  document.getElementById("y").innerText = "";
  document.getElementById("forty-two-error").innerText = "";
  showSpinner();
  fibonacciX = document.getElementById("inputField").value;
  if (fibonacciX > 50) {
    let alert = document.getElementById("alert");
    showAlert();
    alert.innerText = "Can't be larger than 50.";
    hideSpinner();
  } else if (fibonacciX < 1) {
    let alert = document.getElementById("alert");
    showAlert();
    alert.innerText = "Can't be less than 1.";
    hideSpinner();
  } else {
    getYFromServer(fibonacciX);
  }

  // Send X to remote server and get back Y. We display Y to the user OR an error if they entered something wrong.
  function getYFromServer(fibonacciX) {
    fetch("http://localhost:5050/fibonacci/" + fibonacciX)
      .then(response => {
        // This starts handling for the '42' error., which returns a 400.
        // If 400, we must return the data as Text to display error message sent by server. Otherwise, we return it as an Object.
        if (response.status === 400) {
          return response.text();
        } else {
          return response.json();
        }
      })
      .then(data => {
        // If the data is text, we print the text to the user as an error.
        // If data is an object, everything has gone succesfully and we print the Y number to the user.
        if (typeof data === "object") {
          hideSpinner();
          document.getElementById("y").innerText = data.result;
          previousResults();
        } else {
          hideSpinner();
          document.getElementById("forty-two-error").innerText =
            "Server Error: " + data;
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

// Hide spinner
function hideSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.className = "";
}

//Show spinner 2 while previous results are loading
function showSpinnerTwo() {
  const spinner = document.getElementById("spinner-results");
  console.log("@@");
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 8000);
}

// Hide spinner 2
function hideSpinnerTwo() {
  const spinner = document.getElementById("spinner-results");
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
