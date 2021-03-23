function addPercentage(htmlElement, limit, offset) {
    let w = htmlElement.style.width
    w = parseInt(w)
    if (w < limit) {
        w += offset
    }
    let formattedNewValue = w.toString() + '%'
    document.getElementById('progress-bar-text').innerHTML = formattedNewValue
    htmlElement.style.width = formattedNewValue
    displayPopup()
}
function getElementWidth(id) {
    return parseInt(document.getElementById(id).style.width)
}

function updateProgressBar(limit, progressBarId) {
    setInterval(addPercentage, 20,document.getElementById(progressBarId),limit,1)
}
<<<<<<< HEAD

=======
function displayPopup() {
  if (getElementWidth('progress') == 99){
         console.log('Response');
         window.location.href = "http://127.0.0.1:5500/src/Eléments/popup/popup.html";
    } 
}
>>>>>>> acd7f9f7cc0d51bb8cafb5077da47a1a6a876bd3
updateProgressBar(99,'progress');

function displayPopup() {
    if (getElementWidth('progress') == 99){
        document.getElementById('all').innerHTML = 
        "<h1>http://127.0.0.1:5501/src/El%C3%A9ments/popup/popup.html;</h1>"
    }
}



 



