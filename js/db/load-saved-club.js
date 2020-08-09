import dbPromised from "./db.js";
import deleteClub from "./delete-club.js";

const loadSavedClub = clubName => {
   dbPromised.then(db => {
       let tx = db.transaction("club","readonly");
       let store = tx.objectStore("club");
       return store.get(clubName);
   }).then(result => {
       const saveBtn = document.getElementById('save');
       saveBtn.style.display = 'none';

       const backBtn = document.getElementById('back-btn');
       backBtn.href = "#saved-club"

       // show club navigation
       const clubNav = document.getElementById('club-nav');
       clubNav.style.display = 'initial';

       //Remove default navigation
       const defaultNav =document.getElementById('default-nav');
       defaultNav.style.display = 'none';

       const clubProfile = document.getElementById('club-profile');
       clubProfile.innerHTML = result['clubProfile'];

       const coaches = document.getElementById('coach');
       coaches.innerHTML = result['clubSquad']['coach'];

       const goalkeepers = document.getElementById('goalkeeper');
       goalkeepers.innerHTML = result['clubSquad']['goalkeeper'];

       const defenders = document.getElementById('defender');
       defenders.innerHTML = result['clubSquad']['defender'];

       const midfielders = document.getElementById('midfielder');
       midfielders.innerHTML = result['clubSquad']['midfielder'];

       const attackers = document.getElementById('attacker');
       attackers.innerHTML = result['clubSquad']['attacker'];

       const scheduleMatch = document.getElementById('club-schedule');
       scheduleMatch.innerHTML = result['clubSchedule'];

       const matchResult = document.getElementById('club-result');
       matchResult.innerHTML = result['clubResult'];

       const deleteBtn = document.getElementById('delete');
       deleteBtn.addEventListener('click', () => {
           deleteClub(clubName);
       })
       console.log(result);
   })
}

export default loadSavedClub;