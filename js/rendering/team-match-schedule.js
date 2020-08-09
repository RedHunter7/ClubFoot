import getClubData from "../data/get-club-data.js";
import month from "../data/month-data.js";

const renderTeamSchedule = (result, clubName ,isCached) => {
    let clubScheduleUI = '';
    let scheduleCollection = result['matches'];
    scheduleCollection.reverse();
    scheduleCollection.forEach(match => {
      let oppShortName;
      let oppCrestUrl;
      console.log(clubName + ' ' + match['homeTeam']['id'] + ' ' + match['awayTeam']['id'])
      if (clubName === match['homeTeam']['id']) {
          let tempObj = getClubData(match['awayTeam']['id']);
          oppShortName = tempObj['shortName'];
          oppCrestUrl = tempObj['crestUrl'];
      } else if(clubName === match['awayTeam']['id']) {
          let tempObj = getClubData(match['homeTeam']['id']);
          oppShortName = tempObj['shortName'];
          oppCrestUrl = tempObj['crestUrl'];
      }

      if(oppCrestUrl === undefined || isCached === true) {
        oppCrestUrl = 'img/Custom-club.svg';
      }

      if(oppShortName === undefined) {
        oppShortName = 'unknown';
      }

      let clubSchedule = `
          <div class="club-result center-align">
              <h6>${oppShortName}</h6>
              <figure>
                  <img src="${oppCrestUrl}" alt="opponent-club">
              </figure>
              <h6>${match["utcDate"].substring(8,10)} ${ month[Number(match["utcDate"].substring(5,7))-1]}</h6>
          </div>
      `
      clubScheduleUI = clubScheduleUI + clubSchedule;
    })

    const scheduleMatch = document.getElementById('club-schedule');
    if(scheduleCollection.length === 0) {
        scheduleMatch.innerHTML = '<h5 class="valign-wrapper center-align">No Upcoming Match for this club</h5>'
    } else {
      scheduleMatch.innerHTML = clubScheduleUI;
    }
}

export default renderTeamSchedule;