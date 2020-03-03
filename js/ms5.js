function test() {
  const Http = new XMLHttpRequest();
  const url = "https://jsonplaceholder.typicode.com/posts";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = e => {
    console.log(Http.responseText);
  };
}

test();

let x = 10;

function callServer() {
  const Http = new XMLHttpRequest();
  const url = "";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = e => {
    console.log(Http.responseText);
  };
}
