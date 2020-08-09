import leagues from "./league-name.js";
const getClubData = idClub => {
    let result = '';
    let clubList = [];
    //Obtain clubs data from session storage
    leagues.forEach(league => {
        clubList.push(JSON.parse(sessionStorage.getItem(`league-teams-${league}`)))
    })
    clubList.forEach(league => {
        league['teams'].forEach(club => {
            if(idClub === club['id']) {
                result = {
                    id: club['id'],
                    name: club['name'],
                    shortName: club['shortName'],
                    crestUrl: club['crestUrl'],
                    league: league['competition']['name'],
                }
            }
        })
    })

    return result;
}

export default getClubData;