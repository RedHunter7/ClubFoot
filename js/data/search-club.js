import leagues from "./league-name.js";
const searchClub = clubName => {
    let clubData = [];
    let searchStatus;
    leagues.forEach(leagueClub => {
        let clubs = JSON.parse(sessionStorage.getItem(`league-teams-${leagueClub}`));
        clubs['teams'].forEach(club => {
            let clubLeague = {
                id: club['id'],
                name: club['name'],
                shortName: club['shortName'],
                crestUrl: club['crestUrl'],
                league: clubs['competition']['name']
            }
            clubData.push(clubLeague);
        })
    })

    if(clubName.length === 0) {
        searchStatus = 0;
    } else {
        searchStatus = 1;
    }

    let matches = clubData.filter(club => {
        const regex = new RegExp(`${clubName}`, 'gi');
        return club['name'].match(regex) || club['shortName'].match(regex);
    })

    let sortedMatches = matches.sort((a,b) => {
        if(a['shortName'] > b['shortName']) {
            return 1;
        } else {
            return -1;
        }
    })

    let result = {
        data: sortedMatches,
        status: searchStatus,
        stringLength: clubName.length
    }

    return result;
}

export default searchClub;