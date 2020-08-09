import CACHE_NAME from "../data/cache.js";

const renderLeagueOverview = (result, isCache) => {
    let leagueLogo = '';
    let defChamp = '';
    for (let index = 0; index < 10; index++) {
        defChamp = result['seasons'][index]["winner"];
        if(defChamp !== null) {
            break;
        }
    }

    if(isCache === true) {
        caches.match(defChamp["crestUrl"])
        .then(response => {
            return response.blob();
        })
        .then(crestUrl => {
            defChamp = crestUrl;
        })
    } else {
        caches.open(CACHE_NAME).then(cache => {
            return cache.add(defChamp["crestUrl"]);
        })
    }

    if (result['id'] === 2021) {
        leagueLogo = "img/premiere-league-logo-icon.svg";
    } else if (result['id'] === 2002) {
        leagueLogo = "img/bundesliga-logo-icon.svg";
    } else if (result['id'] === 2014) {
        leagueLogo = "img/LaLiga-logo-icon.svg";
    } else if (result['id'] === 2019) {
        leagueLogo = "img/serie-A-logo-icon.svg";
    }
    let html = `
    <main class="center-align">
      <figure class="league-icon">
        <img src="${leagueLogo}" alt="">
      </figure>
      <figure class="defending-champions">
        <h5>Defending Champions</h5>
        <img src="${defChamp["crestUrl"]}" alt="defender-champion-icon">
        <h5>${defChamp["shortName"]}</h5>
      </figure>
    </main>
    `;
    let leagueEmblem = document.getElementById('league-emblem');
    leagueEmblem.innerHTML = html;
}

export default renderLeagueOverview;