function addPercentage(htmlElement, limit, offset) {
    let w = htmlElement.style.width
    w = parseInt(w)
    if (w < limit) {
        w += offset
    }
    let formattedNewValue = w.toString() + '%'
    document.getElementById('progress-bar-text').innerHTML = formattedNewValue
    htmlElement.style.width = formattedNewValue
}
function getElementWidth (id) {
    return parseInt(document.getElementById(id).style.width)
}

function updateProgressBar(limit, progressBarId) {
    setInterval(addPercentage, 2000,document.getElementById(progressBarId),limit,1)
}

updateProgressBar(99,'progress');