pastFibResults();
async function pastFibResults(sortOrder) {
  hideResultsAlert();
  showResultsSpinner();
  let results = document.getElementById("past-results");
  results.innerHTML = "";
  let response = await fetch("http://localhost:5050/getFibonacciResults");
  let data = await response.json();
  // Sort order. 1 is Y value asc. 2 is Y value desc. 3 is Date asc. 4 is Date desc.
  if (sortOrder === 1) {
    data.results.sort(function(a, b) {
      return a.result - b.result;
    });
  } else if (sortOrder === 2) {
    data.results.sort(function(a, b) {
      return b.result - a.result;
    });
  } else if (sortOrder === 3) {
    data.results.sort(function(a, b) {
      return new Date(a.createdDate) - new Date(b.createdDate);
    });
  } else if (sortOrder === 4) {
    data.results.sort(function(a, b) {
      return new Date(b.createdDate) - new Date(a.createdDate);
    });
  }
  for (let i = 0; i < data.results.length; i++) {
    let fibOfText = document.createElement("span");
    fibOfText.innerText = "The Fibonacci Of ";
    let isText = document.createElement("span");
    isText.innerText = " is ";
    let calculatedText = document.createElement("span");
    let date = new Date(data.results[i].createdDate).toString();
    calculatedText.innerText = `. Calculated at ${date}`;
    let fibX = document.createElement("span");
    fibX.className = "bold";
    fibX.innerText = data.results[i].number;
    let fibY = document.createElement("span");
    fibY.className = "bold";
    fibY.innerHTML = data.results[i].result;
    let newLi = document.createElement("li");
    newLi.append(fibOfText, fibX, isText, fibY, calculatedText);
    let results = document.getElementById("past-results");
    results.appendChild(newLi);
  }
  hideResultsSpinner();
}

let dropdown = document.getElementById("dropdown");
dropdown.addEventListener("click", displayDropDownItems);

function displayDropDownItems() {
  var x = document.getElementById("dropdown-list");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

let numAsc = document.getElementById("numAsc");
numAsc.addEventListener("click", () => {
  pastFibResults(1);
});

let numDesc = document.getElementById("numDesc");
numDesc.addEventListener("click", () => {
  pastFibResults(2);
});

let dateAsc = document.getElementById("dateAsc");
dateAsc.addEventListener("click", () => {
  pastFibResults(3);
});

let dateDesc = document.getElementById("dateDesc");
dateDesc.addEventListener("click", () => {
  pastFibResults(4);
});

let calcFibButton = document.getElementById("calcFib");
calcFibButton.addEventListener("click", validateNumFromUser);

function validateNumFromUser() {
  hideAlert();
  showCheckBox();
  document.getElementById("y").innerText = "";
  document.getElementById("forty-two-error").innerText = "";
  showSpinner();
  let alert = document.getElementById("alert");
  fibonacciX = document.getElementById("inputField").value;
  if (isNaN(fibonacciX) === true) {
    showAlert();
    alert.innerText = "Must enter a number.";
    hideSpinner();
  } else if (fibonacciX > 50) {
    showAlert();
    alert.innerText = "Can't be larger than 50.";
    hideSpinner();
  } else if (fibonacciX < 1) {
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

  async function calculateFibonacciViaServer(x) {
    let response = await fetch("http://localhost:5050/fibonacci/" + x);
    let data;
    console.log;
    if (!response.ok) {
      data = await response.text();
    } else {
      data = await response.json();
    }
    if (typeof data === "object") {
      hideSpinner();
      document.getElementById("y").innerText = data.result;
      pastFibResults();
    } else {
      hideSpinner();
      document.getElementById("forty-two-error").innerText =
        "Server Error: " + data;
    }
  }
}

function showSpinner() {
  let spinner = document.getElementById("spinner");
  spinner.classList.remove("hide-element");
  spinner.classList.add("display-element");
}

function hideSpinner() {
  let spinner = document.getElementById("spinner");
  spinner.classList.remove("display-element");
  spinner.classList.add("hide-element");
}

function showResultsSpinner() {
  let spinner = document.getElementById("spinner-results");
  spinner.classList.remove("hide-element");
  spinner.classList.add("display-element");
}

function hideResultsSpinner() {
  let spinner = document.getElementById("spinner-results");
  spinner.classList.remove("display-element");
  spinner.classList.add("hide-element");
}

function showAlert() {
  hideCheckBox();
  let alert = document.getElementById("alert");
  alert.classList.remove("hide-element");
  alert.classList.add("display-element");
  let userInputField = document.getElementById("inputField");
  userInputField.classList.add("red");
  setTimeout(() => {
    hideAlert();
    showCheckBox();
  }, 3000);
}

function hideAlert() {
  let alert = document.getElementById("alert");
  alert.classList.remove("display-element");
  alert.classList.add("hide-element");
  let userInputField = document.getElementById("inputField");
  userInputField.classList.remove("red");
}

function showResultsAlert() {
  let alert = document.getElementById("alert-results");
  alert.classList.remove("hide-element");
  alert.classList.add("display-element");
}

function hideResultsAlert() {
  let alert = document.getElementById("alert-results");
  alert.classList.remove("display-element");
  alert.classList.add("hide-element");
}

function showCheckBox() {
  let checkBox = document.getElementById("save-calculations");
  checkBox.classList.remove("hide-element");
  checkBox.classList.add("display-element");
}

function hideCheckBox() {
  let checkBox = document.getElementById("save-calculations");
  checkBox.classList.remove("display-element");
  checkBox.classList.add("hide-element");
}
