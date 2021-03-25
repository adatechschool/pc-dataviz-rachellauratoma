const ALIEN_VAULT_OTX_APIKEY = "0c6a9e18904ab03c5cf7f45a73d9de21ce5ed998a70a1ec7c2457079d3b981d4"
const VIRUS_TOTAL_APIKEY = "6ed021a6404ba123ef10ca82effe64c1f32b644b37b5716def03d5c1e145bf8c"
const IPDB_APIKEY = "2450c25939d8c997aec5432912584f34c91312bf955e50a8ee1d7179f55e24f53cd8a13d0b4e926b"

var vtVotes;
var vtStats;
var otxMalwares;

let main = () => {
    let submit = document.getElementById("submit-query")
    submit.addEventListener("click",checkDomainSyntax)
}

let toggleDetails = _ => {
    let details_container = document.getElementById('output')
    console.log(details_container.style.display);
    if (details_container.style.display=='none') details_container.style.display='block'
    else if (details_container.style.display=='block') details_container.style.display='none'
}

let checkDomainSyntax = () => {
    let domain = document.getElementById('domain-name').value;
    if (/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/.test(domain)) {
        let verdict = queryHandler(domain)
        let verdictElement = document.createElement('p')
        verdictElement.innerHTML = `${verdict}`
        document.getElementById('verdict').appendChild(verdictElement)
    } else {
        alert('Error: Invalid domain name.')
    }
}

let formatKey = (key) => {
    let tmp = []
    let spltKey = key.split('_');
    for (const part of spltKey) {
        tmp.push(part[0].toUpperCase() + part.slice(1))
    }
    return tmp.join(' ')
}

let parseOTXResponse = (json_data, origin) => {

    if (origin == 'otx-malware') {
        if (json_data.count === -1) {
            return '<tr><td>No reported malware.</td></tr>'
        } else {
            otxMalwares = json_data.count
            return `<tr><td>Total size:</td><td>${json_data.size}</td></tr><tr><td>Total counts:</td><td>${json_data.count}</td></tr>`


        }

    } else if (origin == 'otx-geo') {
        let htmlString = ""
        for (const key in json_data) {
            if (Object.hasOwnProperty.call(json_data, key)) {
                const element = json_data[key]
                htmlString += `<tr><td>${formatKey(key)}:</td><td>${element}</td></tr>`
            }
        }
        return htmlString
    }
}

let parseVTResponse = (last_stats) => {
    let htmlString = ""
    for (const stat in last_stats) {
        if (Object.hasOwnProperty.call(last_stats, stat)) {
            const value = last_stats[stat]
            htmlString += `<tr><td>${formatKey(stat)}:</td><td>${value}</td></tr>`
            console.log(htmlString)
        }
    }
    return htmlString
}

let otxFetch = (domain,a = ['malware','geo']) => {
    let url = `https://otx.alienvault.com/api/v1/indicators/domain/${domain}/`
    for (const element of a) {
        console.log(element);
        fetch (url+element,{
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers:{
                "X-OTX-API-KEY" : ALIEN_VAULT_OTX_APIKEY
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            document.getElementById(`otx-${element}`).innerHTML = parseOTXResponse(data,`otx-${element}`)
        })
    }
}

let vtFetch = (domain) => {
    let url = `https://www.virustotal.com/api/v3/domains/${domain}`
    fetch(url,{
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers:{
            'x-apikey': VIRUS_TOTAL_APIKEY
        }
    }).then(response => {
        return response.json()
    }).then(data => {
        vtStats = data.data.attributes.last_analysis_stats
        vtVotes = data.data.attributes.total_votes
        document.getElementById('vt-last').innerHTML = parseVTResponse(vtStats)
        document.getElementById('vt-votes').innerHTML = parseVTResponse(data.data.attributes.total_votes)

    })

    if (vtVotes.malicious == 0){
        if (vtVotes.harmless == 0) return "There isn't enough data to confirm the fiability of this domain, be careful."
        else if (vtVotes.harmless < 10) return "There isn't much data, but the domain is most likely safe to use. Beware still."

    }

    let vtVotesRating = vtVotes.harmless / vtVotes.malicious
    if (vtVotesRating < 1) return "This domain should not be trusted"
    else if (vtVotesRating < 2) return "This domain is seemingly safe to use, but be careful."
    else if (vtVotesRating < 3) return "This domain is most likely safe to use."
    else return "This domain is certainly safe to use"
    }



let queryHandler = (domain) => {
    otxFetch(domain)
    return vtFetch(domain) // TODO: FONCTIOOOOOOOOOOON

}