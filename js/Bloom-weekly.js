// Milestone 5 with Fetch. Send X to remote server and get back Y.
function buttonClicked() {
  fibonacciX = document.getElementById("inputField").value;
  fetch("http://localhost:5050/fibonacci/" + fibonacciX)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      let y = data.result;
      document.getElementById("y").innerText = y;
    });
}

//Milestone 5 with AJAX. Send X to remote server and get back Y.

// function buttonClicked() {
//   fibonacciX = document.getElementById("inputField").value;
//   let xhr = new XMLHttpRequest();
//   let url = "http://localhost:5050/fibonacci/" + fibonacciX;
//   xhr.open("GET", url);
//   xhr.responseType = "text";
//   xhr.onload = function() {
//     // alert(`Loaded: ${xhr.status} ${xhr.response}`);
//     let all = JSON.parse(xhr.response);
//     let y = all.result;
//     console.log("The y is: " + y);
//     document.getElementById("y").innerText = y;
//   };
//   xhr.send();
// }
