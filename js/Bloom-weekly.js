
//Milestone 5. Send X to remote server and get back Y. I used AJAX.
function buttonClicked() {
  fibonacciX = document.getElementById("inputField").value;
  let xhr = new XMLHttpRequest();
  let url = "http://localhost:5050/fibonacci/" + fibonacciX;
  xhr.open("GET", url);
  xhr.responseType = "text";
  xhr.onload = function() {
    // alert(`Loaded: ${xhr.status} ${xhr.response}`);
    let all = JSON.parse(xhr.response);
    let y = all.result;
    console.log("The y is: " + y);
    document.getElementById("y").innerText = y;
  };
  xhr.send();
}
