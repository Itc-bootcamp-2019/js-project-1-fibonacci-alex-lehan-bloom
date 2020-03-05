// //Milestone 7.1
// function previousResults() {
//   console.log("hello")
//   showSpinnerTwo();
//   let response = await fetch("http://localhost:5050/getFibonacciResults");
//   let data = await response.json();
//   for (let i = 0; i < data.results.length; i++) {
//     let results = document.getElementById("results-list");
//     let date = new Date(data.results[i].createdDate).toUTCString();
//     let newLi = document.createElement("li");
//     newLi.innerHTML = `The fibonacci Of <span class="bold">${data.results[i].number}</span> is <span class="bold">${data.results[i].result}</span>. Calculated at: ${date}`;
//     results.appendChild(newLi);
//   }
//   hideSpinnerTwo();
// }

previousResults();
function previousResults() {
  showSpinnerTwo();
  let results = document.getElementById("results-list");
  results.innerHTML = "";
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

// On button click, initate validateNumFromUser().
let button = document.getElementById("button");
button.addEventListener("click", validateNumFromUser);

function validateNumFromUser() {
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

  function getYFromServer(fibonacciX) {
    fetch("http://localhost:5050/fibonacci/" + fibonacciX)
      .then(response => {
        if (response.status === 400 || response.status === 500) {
          return response.text();
        } else {
          return response.json();
        }
      })
      .then(data => {
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

function showSpinnerTwo() {
  let spinner = document.getElementById("spinner-results");
  spinner.style.display = "inline-block";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 8000);
}

function hideSpinnerTwo() {
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
