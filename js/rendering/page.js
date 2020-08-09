import loadLeague from "../data/league-data.js";
import loadClubList from "../data/club-list-data.js";
import loadClub from "../data/club-info-data.js";
import loadHomepage from "./home-page.js";
import allSavedClubs from "../db/list-saved-club.js";
import loadSavedClub from "../db/load-saved-club.js";

const loadPage = page => {
    const body = document.getElementById('body-content');

    const clubNav = document.getElementById('club-nav');
    clubNav.style.display = 'none';

    const defaultNav =document.getElementById('default-nav');
    defaultNav.style.display = 'initial';

    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', () => {
        //Laad Page on clicked menu
        let page = backBtn.getAttribute("href").substr(1);
        loadPage(page);
    })

    let leagueName;
    let clubName;
    let isSaved;
    if(page.substr(0,6) === "league") {
        leagueName = page.substr(7);
        page = "league";
    } else if(page.substr(0,9) === "club-info") {
        clubName = page.substr(10);
        page = "club-info";
        isSaved = false;
    } else if(page.substr(0,15) === "saved-club-info") {
        clubName = page.substr(16);
        page = "club-info";
        isSaved = true;
    }
    console.log(page);
    console.log(leagueName)
    fetch(`page/${page}.html`)
      .then(response => {
          console.log(response);
          return response.text();
      })
      .then(result => {
          body.innerHTML = result;

          if(page === "league") {
              console.log(leagueName);
              loadLeague(leagueName);
          } else if (page === "search-club") {
              loadClubList();
          } else if (page === "club-info") {
              clubName = Number(clubName);
              if(isSaved === false) {
                loadClub(clubName);
              } else if(isSaved === true) {
                  loadSavedClub(clubName);
              }
          } else if (page === "home") {
              loadHomepage();
          } else if(page === "saved-club") {
              allSavedClubs();
          }

      }).catch(err => {
          console.log(err);
          body.innerHTML = `<div class="preloader-container">
                                <h3 class="white-text center-align">Cannot load on offline mode</h3>
                            </div>`
      })
}

export default loadPage;