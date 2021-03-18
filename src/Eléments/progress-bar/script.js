let clickMe = () => {
    let e = document.getElementById('progress')
    e.style.width = addPercentage(e,99,1)
}

function addPercentage(element, limit, offset) {
    let w = element.style.width
    document.getElementById('progress-bar-text').innerHTML=w
    w = parseInt(w)
    if (w < limit) {
        w +=offset
    }
    let formattedNewValue = w.toString() + '%'
    element.style.width = formattedNewValue
}
