let button = document.getElementById("button");
button.addEventListener("click", getYFromServer);

// Milestone 5 with Fetch. Send X to remote server and get back Y.
function getYFromServer() {
  fibonacciX = document.getElementById("inputField").value;
  fetch("http://localhost:5050/fibonacci/" + fibonacciX)
    .then(response => {
      return response.text();
    })
    .then(data => {
      console.log(data);
      let y = data.result;
      document.getElementById("y").innerText = data;
    });
}
