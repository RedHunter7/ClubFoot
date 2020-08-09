import getClubData from "../data/get-club-data.js";
const renderTeamResult = (result, clubName ,isCached) => {
    let clubResultsUI = '';
    let resultCollection = result['matches'];
    resultCollection.reverse();
    resultCollection.forEach(match => {
        let wdl;
        let oppShortName;
        let oppCrestUrl;
        if (clubName === match['homeTeam']['id']) {
            let tempObj = getClubData(match['awayTeam']['id']);
            oppShortName = tempObj['shortName'];
            oppCrestUrl = tempObj['crestUrl'];
            if(match['score']['fullTime']['homeTeam'] > match['score']['fullTime']['awayTeam']) {
                wdl = 'W';
            } else if (match['score']['fullTime']['homeTeam'] < match['score']['fullTime']['awayTeam']) {
                wdl = 'L';
            } else {
                wdl = 'D';
            }
        } else if(clubName === match['awayTeam']['id']) {
            let tempObj = getClubData(match['homeTeam']['id']);
            oppShortName = tempObj['shortName'];
            oppCrestUrl = tempObj['crestUrl'];
            if(match['score']['fullTime']['awayTeam'] > match['score']['fullTime']['homeTeam']) {
                wdl = 'W';
            } else if (match['score']['fullTime']['awayTeam'] < match['score']['fullTime']['homeTeam']) {
                wdl = 'L';
            } else {
                wdl = 'D';
            }
        }

        console.log(oppCrestUrl);
        console.log(oppShortName);

        if(oppCrestUrl === undefined || isCached === true) {
            oppCrestUrl = 'img/Custom-club.svg';
        }
        if(oppShortName === undefined) {
            oppShortName = 'unknown';
        }
        let clubResult = `
            <div class="club-result center-align">
                <h6>${oppShortName}</h6>
                <figure>
                    <img src="${oppCrestUrl}" alt="opponent-club">
                </figure>
                <h6>${match['score']['fullTime']['homeTeam']} - ${match['score']['fullTime']['awayTeam']} (${wdl})</h6>
            </div>
        `
        clubResultsUI = clubResultsUI + clubResult;
    })
    const matchResult = document.getElementById('club-result');
    matchResult.innerHTML = clubResultsUI;

    if(resultCollection.length === 0) {
        matchResult.innerHTML = '<h5 class="valign-wrapper center-align">Match Result Unavaible</h5>'
    } else {
        matchResult.innerHTML = clubResultsUI;
    }
}

export default renderTeamResult;