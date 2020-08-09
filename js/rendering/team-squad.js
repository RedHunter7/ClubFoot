import CACHE_NAME from "../data/cache.js";
const renderTeamSquad = (result,isCached) => {
    let continental = ``;
    let local = ``;
    result['activeCompetitions'].forEach(elm => {
        if(elm['code'] === 'EL' || elm['code'] === 'CL') {
            continental = elm['name'];
        } else {
            local = elm['name'];
        } 
    })

    //check club participate on continental competition
    if(continental === '') {
        continental = "Not Participated";
    }

    let logoClub = '';

    if(isCached === true) {
        logoClub = "img/Custom-club.svg";
    } else {
        logoClub = result['crestUrl'];
    }
  
    // Club profile user interface
    const clubProfileUI = `
      <div class="club-emblem-and-name">
        <figure>
            <img src="${logoClub}" alt="club-emblem">
        </figure>
        <div class="club-name">
          <h5>${result['name']}</h5>
          <h5>${local}</h5>
        </div>
      </div>
      <div class="club-venue-and-continetal">
        <div class="club-venue">
            <h5>${result['venue']}</h5>
            <h6>Venue</h6>
        </div>
        <div class="club-continental">
            <h5>${continental}</h5>
            <h6>Continental Competitions</h6>
        </div>
      </div>
    `;
    const clubProfile = document.getElementById('club-profile');
    clubProfile.innerHTML = clubProfileUI;

    let coachesUI = '';
    let goalkeepersUI = '';
    let defendersUI = '';
    let midfieldersUI = '';
    let attackersUI = '';

    result['squad'].forEach(people => {
        let shirtNumber;
        if(people['shirtNumber'] === null) {
            shirtNumber = '-';
        } else {
            shirtNumber = people['shirtNumber'];
        }

        if(people['role'] === 'COACH') {
            let coach = `
              <div class="coach">
                  <h5>${people['name']}</h5>
                  <h6>${people['nationality']}</h6>
              </div>
            `;
            coachesUI = coachesUI + coach;
        } else if(people['position'] === 'Goalkeeper') {
            let goalkeeper = `
              <div class="player">
                  <div class="player-name-and-nation left-align">
                      <h5>${people['name']}</h5>
                      <h6>${people['nationality']}</h6>
                  </div>
                  <div class="player-number">
                      <h2>${shirtNumber}</h2>
                  </div>
              </div>
            `;
            goalkeepersUI = goalkeepersUI + goalkeeper;
        } else if(people['position'] === 'Defender') {
            let defender = `
              <div class="player">
                  <div class="player-name-and-nation left-align">
                      <h5>${people['name']}</h5>
                      <h6>${people['nationality']}</h6>
                  </div>
                  <div class="player-number">
                      <h2>${shirtNumber}</h2>
                  </div>
              </div>
            `;
            defendersUI = defendersUI + defender;
        } else if(people['position'] === 'Midfielder') {
            let midfielder = `
              <div class="player">
                  <div class="player-name-and-nation left-align">
                      <h5>${people['name']}</h5>
                      <h6>${people['nationality']}</h6>
                  </div>
                  <div class="player-number">
                      <h2>${shirtNumber}</h2>
                  </div>
              </div>
            `;
            midfieldersUI = midfieldersUI + midfielder;
        } else if (people['position'] === 'Attacker') {
            let attacker = `
              <div class="player">
                  <div class="player-name-and-nation left-align">
                      <h5>${people['name']}</h5>
                      <h6>${people['nationality']}</h6>
                  </div>
                  <div class="player-number">
                      <h2>${shirtNumber}</h2>
                  </div>
              </div>
            `;
            attackersUI = attackersUI + attacker;
        }
    })

    const coaches = document.getElementById('coach');
    coaches.innerHTML = coachesUI;

    const goalkeepers = document.getElementById('goalkeeper');
    goalkeepers.innerHTML = goalkeepersUI;

    const defenders = document.getElementById('defender');
    defenders.innerHTML = defendersUI;

    const midfielders = document.getElementById('midfielder');
    midfielders.innerHTML = midfieldersUI;

    const attackers = document.getElementById('attacker');
    attackers.innerHTML = attackersUI;
}

export default renderTeamSquad;