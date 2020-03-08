previousResults();
async function previousResults() {
  showResultsSpinner();
  let results = document.getElementById("results-list");
  results.innerHTML = "";
  let response = await fetch("http://localhost:5050/getFibonacciResults");
  let data = await response.json();
  console.log(data);
  for (let i = 0; i < data.results.length; i++) {
    let results = document.getElementById("results-list");
    let date = new Date(data.results[i].createdDate).toUTCString();
    let newLi = document.createElement("li");
    newLi.innerHTML = `The fibonacci Of <span class="bold">${data.results[i].number}</span> is <span class="bold">${data.results[i].result}</span>. Calculated at: ${date}`;
    results.appendChild(newLi);
  }
  hideResultsSpinner();
}

// On button click, initate validateNumFromUser().
let button = document.getElementById("button");
button.addEventListener("click", validateNumFromUser);

function validateNumFromUser() {
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
    if (document.getElementById("checkBox").checked === true) {
      calculateFibonacciViaServer(fibonacciX);
    } else {
      let y = calculateFibonacciLocally(fibonacciX);
      hideSpinner();
      document.getElementById("y").innerText = y;
    }
  }

  function calculateFibonacciLocally(x) {
    //base case.
    if (x === 1 || x === 0) return x;
    //recursive case.
    else {
      return (
        calculateFibonacciLocally(x - 2) + calculateFibonacciLocally(x - 1)
      );
    }
  }

  async function calculateFibonacciViaServer(fibonacciX) {
    console.log("remote");
    let response = await fetch("http://localhost:5050/fibonacci/" + fibonacciX);
    console.log(response.status);
    let data;
    if (response.status === 400 || response.status === 500) {
      data = await response.text();
    } else {
      data = await response.json();
    }
    console.log(data);
    if (typeof data === "object") {
      hideSpinner();
      document.getElementById("y").innerText = data.result;
      previousResults();
    } else {
      hideSpinner();
      document.getElementById("forty-two-error").innerText =
        "Server Error: " + data;
    }
  }
}

function showSpinner() {
  let spinner = document.getElementById("spinner");
  spinner.style.display = "inline-block";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 8000);
}

function hideSpinner() {
  let spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}

function showResultsSpinner() {
  let spinner = document.getElementById("spinner-results");
  spinner.style.display = "inline-block";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 8000);
}

function hideResultsSpinner() {
  let spinner = document.getElementById("spinner-results");
  spinner.style.display = "none";
}

function showAlert() {
  const alert = document.getElementById("alert");
  alert.className = "alert alert-danger show";
  const inputField = document.getElementById("inputField");
  inputField.className = "form-control red";
}

function hideAlert() {
  const alert = document.getElementById("alert");
  alert.className = "";
  const inputField = document.getElementById("inputField");
  inputField.className = "form-control";
}
