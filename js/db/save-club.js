import dbPromised from "./db.js";
import getClubData from "../data/get-club-data.js";
const saveClub = clubId => {
    const saveBtn =document.getElementById('save');
    const clubData = getClubData(clubId);
    console.log(clubData);

    const clubProfile = document.getElementById('club-profile');

    const coaches = document.getElementById('coach');
    const goalkeepers = document.getElementById('goalkeeper');
    const defenders = document.getElementById('defender');
    const midfielders = document.getElementById('midfielder');
    const attackers = document.getElementById('attacker');

    const squad = {
        coach: coaches.innerHTML,
        goalkeeper: goalkeepers.innerHTML,
        defender: defenders.innerHTML,
        midfielder: midfielders.innerHTML,
        attacker: attackers.innerHTML
    }

    const scheduleMatch = document.getElementById('club-schedule');
    const matchResult = document.getElementById('club-result');

    dbPromised.then(db => {
        let tx = db.transaction('club','readwrite');
        let store = tx.objectStore('club');
        let item = {
            id: clubData['id'],
            name: clubData['name'],
            shortName: clubData['shortName'],
            crestUrl: clubData['crestUrl'],
            league: clubData['league'],
            clubProfile: clubProfile.innerHTML,
            clubSquad: squad,
            clubSchedule: scheduleMatch.innerHTML,
            clubResult: matchResult.innerHTML
        }
        store.put(item);
        return tx.complete;
    }).then(() => {
        console.log("Success");
        saveBtn.style.display = "none";
    
        const isSaved = localStorage.getItem(`Club-${clubId}`);
        if(typeof(Storage) !== undefined) {
            if (isSaved === null) {
                M.toast({html: 'Club has been saved'});
                localStorage.setItem(`Club-${clubId}`,true);
            }
        }
    }).catch(err => {
        console.log("failed" + err);
    })
}

export default saveClub;