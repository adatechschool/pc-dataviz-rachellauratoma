// PROGRESS BAR

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
function getElementWidth(id) {
    return parseInt(document.getElementById(id).style.width)
}

function wrapper() {
    addPercentage(document.getElementById('progress'),99,1)
    popupHandler()
}

setInterval(wrapper, 2)

function popupHandler() {
    if (getElementWidth('progress') == 99){
        document.getElementById('popup').style.display = 'block'
        document.getElementById('progress').style.width='0%'
    }
}

function displayLoader(){
    document.getElementById('popup').style.display = 'none'
    document.getElementById('progress-bar').style.display = 'none'
    document.getElementById('loader').style.display = 'none'

}

 



