import dbPromised from "./db.js";
import clubLink from "../rendering/club-link.js";
const allSavedClubs = () => {
    dbPromised.then(db => {
        let tx = db.transaction('club','readonly');
        let store = tx.objectStore('club');
        return store.getAll();
    }).then(result => {
        const clubListUI = document.getElementById('club-list');

        if(result.length === 0) {
            clubListUI.innerHTML = '<h4 class="center-align white-text">You not save any club right now</h4>'    
        } else {
            let clubList = '';
            result.forEach(club => {
                let savedClub = `
                <div class="col s12 m6 l4 xl3">
                    <a href="#saved-club-info-${club['id']}">
                        <div class="club center-align">
                            <h5>${club['league']}</h5>
                            <figure>
                                <img src="${club['crestUrl']}" alt="club-logo">
                            </figure>
                            <h5>${club['shortName']}</h5>
                        </div>
                    </a>
                </div>
                `;
                clubList = clubList + savedClub; 
            })
    
            clubListUI.innerHTML = clubList;
        }
        console.log(result);
        

        clubLink();
    })
}

export default allSavedClubs;