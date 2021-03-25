fetch('vt_out.json')
.then(response => {
    return response.json()
})
.then(data => {
    for (const stat in data.data.attributes.last_analysis_st) {
        if (Object.hasOwnProperty.call(data.data.attributes.last_analysis_st, stat)) {
            const stat_val = data.data.attributes.last_analysis_stats[stat];
            document.getElementById('vt-last').innerHTML = `<tr><td>${formatKey(stat)}</td><td>${stat_val}</td></tr>`
        }
    }
})