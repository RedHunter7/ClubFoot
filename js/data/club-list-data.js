import league from "./league-name.js";
import clubLink from "../rendering/club-link.js";
import searchClub from "./search-club.js";

const loadClubList = () => {
    let clubLeagueList = [];
    league.forEach(leagueClubs => {
        console.log(JSON.parse(sessionStorage.getItem(`league-teams-${leagueClubs}`)));
        let clubList = JSON.parse(sessionStorage.getItem(`league-teams-${leagueClubs}`));
        console.log(clubList);
        clubList['teams'].forEach(club => {
            let clubLogo;
            if(navigator.onLine === false) {
                clubLogo = "img/Custom-club.svg";
            } else {
                clubLogo = club['crestUrl'];
            }
            let leagueTeam = `
                    <div class="col s12 m6 l4 xl3">
                        <a href="#club-info-${club['id']}">
                            <div class="club center-align">
                                <h5>${clubList['competition']['name']}</h5>
                                <figure>
                                    <img src="${clubLogo}" alt="club-logo">
                                </figure>
                                <h5>${club['shortName']}</h5>
                            </div>
                        </a>
                    </div>
            `;

            clubLeagueList.push(leagueTeam);
        })
    })

    const renderClubs = elm => {
        let clubsUI = '';
        elm.forEach(club => {
            clubsUI = clubsUI + club;
        })
        return clubsUI;
    }

    for (let i = clubLeagueList.length-1; i >= 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = clubLeagueList[i];
        clubLeagueList[i] = clubLeagueList[j];
        clubLeagueList[j] = temp;
    }

    const clubListUI = document.getElementById('club-list');
    clubListUI.innerHTML = renderClubs(clubLeagueList.slice(0,16));

    const loadMoreBtn = document.getElementById('load-more-btn');
    let clickIndex =  0;
    const scrollHeight = clubListUI.scrollHeight/8;

    loadMoreBtn.addEventListener('click', () => {
        clickIndex++;
        window.scrollBy(0,scrollHeight*-1);
        if (clickIndex === 4) {
            clubListUI.innerHTML = clubListUI.innerHTML + renderClubs(clubLeagueList.slice(16*clickIndex,78));
            loadMoreBtn.classList.add('hide');
        } else {
            clubListUI.innerHTML = clubListUI.innerHTML + renderClubs(clubLeagueList.slice(16*clickIndex,16*(clickIndex+1)));
        }
        clubLink();
    });

    clubLink();

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        let searchResult =  searchClub(searchInput.value);
        console.log(searchResult);
    
        if(searchResult['data'].length > 0) {
            loadMoreBtn.style.display = "none";
            const html = searchResult['data'].map( match => {
                let clubLogo;
                if(navigator.onLine === false) {
                    clubLogo = "img/Custom-club.svg";
                } else {
                    clubLogo = match['crestUrl'];
                }
                return `
                <div class="col s12 m6 l3">
                        <a href="#club-info-${match['id']}">
                            <div class="club center-align">
                                <h5>${match['league']}</h5>
                                <figure>
                                    <img src="${clubLogo}" alt="club-logo">
                                </figure>
                                <h5>${match['shortName']}</h5>
                            </div>
                        </a>
                    </div>
                `
            } ).join('')

            clubListUI.innerHTML = html;
        } else {
            loadMoreBtn.style.display = 'none';
            clubListUI.innerHTML = `<div class="col s12"><h3 class="center-align white-text">Club you searched was not found</h3></div>`;
        }

        if (searchResult['status'] === 0) {
            clubListUI.innerHTML = renderClubs(clubLeagueList.slice(0,16));
            loadMoreBtn.style.display = 'initial';
        }

        clubLink();
    });
}

export default loadClubList;