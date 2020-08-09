import loadCarousel from "./carousel.js";
import getClubData from "../data/get-club-data.js";
import month from "../data/month-data.js";

const renderLeagueMatchday = (result, isCached) => {
    let matchCollection = [];
    let matchesUI = '';
    const matches = result['matches'];
    matches.forEach(element => {
        let homeScore = '';
        let awayScore = '';
        let temp = '';
        let homeShortName = '';
        let awayShortName = '';
        let check;

        temp = getClubData(element['homeTeam']['id']);
        homeShortName = temp['shortName'];

        temp = getClubData(element['awayTeam']['id']);
        awayShortName = temp['shortName'];

        let homeTeam = getClubData(element['homeTeam']['id']);
        let awayTeam = getClubData(element['awayTeam']['id']);

        if (element['score']['fullTime']['homeTeam'] !== null) {
            homeScore = element['score']['fullTime']['homeTeam'];
        }
        if (element['score']['fullTime']['awayTeam'] !== null) {
            awayScore = element['score']['fullTime']['awayTeam'];
        }

        if(isCached === true) {
            homeTeam['crestUrl'] = "img/Custom-club.svg";
            awayTeam['crestUrl'] = "img/Custom-club.svg";
        }

        if(homeScore === '' && awayScore === '') {
            check = 'VS';
        } else {
            check = '-'
        }

        console.log(Number(element["utcDate"].substring(5,7))-1);
        let match = `
          <div class="match">
              <h5>${element["utcDate"].substring(8,10)} ${ month[Number(element["utcDate"].substring(5,7))-1]},
              ${element["utcDate"].substring(11,16)} UTC 
              </h5>
              <div class="club-versus">
                  <div class="club">
                      <figure>
                          <img src="${homeTeam['crestUrl']}" alt="home-team">
                      </figure>
                      <h6>${homeShortName}</h6>
                  </div>
                  <h4>${homeScore}</h4>
                  <h4>${check}</h4>
                  <h4>${awayScore}</h4>
                  <div class="club">
                      <figure>
                          <img src="${awayTeam['crestUrl']}" alt="away-team">
                      </figure>
                      <h6>${awayShortName}</h6>
                  </div>
              </div>
          </div>
        `;

        matchesUI = matchesUI + match;
        matchCollection.push(match);
    })

    let dekstopCarouselUI = '';
    console.log(matchCollection.length);
    let index = 0;

    for(let i=0; i < (matchCollection.length/2); i++) {
        let temp = `
          <div class="carousel-item">${matchCollection[index]} ${matchCollection[index+1]}</div>
        `;
        dekstopCarouselUI = dekstopCarouselUI + temp;
        index = index + 2;
    }

    console.log(dekstopCarouselUI);

    const matchday = document.getElementById('matchday-mobile');
    matchday.innerHTML = matchesUI;

    const dekstopCarousel = document.getElementById('match-carousel');
    dekstopCarousel.innerHTML = dekstopCarouselUI;

    loadCarousel();
}

export default renderLeagueMatchday;