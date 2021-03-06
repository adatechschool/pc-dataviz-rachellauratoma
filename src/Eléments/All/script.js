var status = 0;

function addPercentage(htmlElement, limit, offset) {
  let w = htmlElement.style.width;
  w = parseInt(w);

  if (w < limit && status == 0) {
    w += offset;
  }
  let formattedNewValue = w.toString() + "%";
  document.getElementById("progress-bar-text").innerHTML = formattedNewValue;
  htmlElement.style.width = formattedNewValue;
}

function getElementWidth(id) {
  return parseInt(document.getElementById(id).style.width);
}

function wrapper() {
  if (status == 0) addPercentage(document.getElementById("progress"), 99, 1);
  popupHandler();
  if (status != 2) document.getElementById("loader").style.display = "none";
}

setInterval(wrapper, 2);

function popupHandler() {
  if (getElementWidth("progress") == 99) {
    status = 1;
    document.getElementById("popup").style.display = "block";
    document.getElementById("progress").style.width = "0%";
    document.getElementById("progress-bar").style.display = "none";
  }
}

function displayLoader() {
  status = 2;
  document.getElementById("loader").style.display = "block";
  document.getElementById("popup").style.display = "none";
  displayQuotes();
}

function displayQuotes() {
  var url =
    "https://api.giphy.com/v1/gifs/search?api_key=vf4y4lH9QtDAa4LJzuqhPExPWVzjyvpm&q=angry&limit=35&offset=0&rating=g&lang=en";
  fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setInterval(() => {
        let image =
          data.data[Math.floor(Math.random() * 34)].images.downsized.url;
        console.log(image);
        document.getElementById("gif-generator").innerHTML =
          "<img src='" + image + "'></img>";
      }, 5000);
    });
}
