import BASE_API from "./base-api.js";
import renderLeagueOverview from "../rendering/league-overview.js";
import renderLeagueStanding from "../rendering/league-standing.js";
import rendeLeagueMatchday from "../rendering/league-matchday.js";

const loadLeague = leagueName => {
    let BASE_URL = `${BASE_API['BASE_URL']}/competitions/${leagueName}`;
    let API_TOKEN = BASE_API['API_KEY'];
    let request = {
        headers: {
            'X-Auth-Token': API_TOKEN,
        }
    }

    const loadLeagueOverview = () => {
        if('caches' in window) {
            caches.match(`${BASE_URL}`).then(response => {
                if (response) {
                    return response.json()
                }
            }).then(result => {
                console.log(result);
                renderLeagueOverview(result,true);

                console.log(result['currentSeason']['currentMatchday']);
                const day = document.getElementById('day');
                if(result['currentSeason']['currentMatchday'] !== null) {
                  day.innerText = `Matchday ${result['currentSeason']['currentMatchday']}`;
                  setTimeout(() => {
                      loadMatchday(result['currentSeason']['currentMatchday']);
                  },1000)
                } else {
                    day.innerText = "Season has been ended"
                }
            })
        }
    fetch(`${BASE_URL}`, request)
      .then(response => {
          console.log(response.status);
          return response.json();
      })
      .then(result => {
          console.log(result);
          renderLeagueOverview(result,false);

          console.log(result['currentSeason']['currentMatchday']);
          const day = document.getElementById('day');
          if(result['currentSeason']['currentMatchday'] !== null) {
            day.innerText = `Matchday ${result['currentSeason']['currentMatchday']}`;
            setTimeout(() => {
                loadMatchday(result['currentSeason']['currentMatchday']);
            },1000)
          } else {
              day.innerText = "Season has been ended"
          }
      }).catch(err => {
          if(navigator.onLine === true) {
              setTimeout(loadLeagueOverview,1000);
          }
          console.log(err);
      });
    }

    setTimeout(loadLeagueOverview,1000);

    // Load League Standing
    const loadStanding = () => {
        if('caches' in window) {
            caches.match(`${BASE_URL}/standings`)
            .then(response => {
                if (response) {
                    return response.json()
                }
            })
            .then(result => {
                renderLeagueStanding(result);
            })
        }

        fetch(`${BASE_URL}/standings`, request)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(result => {
            renderLeagueStanding(result);
        }).catch(err => {
            if(navigator.onLine === true) {
                setTimeout(loadStanding,1000);
            }
            console.log(err);
        });
      }

      setTimeout(loadStanding,1000);

      //Load League Matchday
        const loadMatchday = day => {

            if('caches' in window) {
                caches.match(`${BASE_URL}/matches?matchday=${day}`)
                .then(response => {
                    if (response) {
                        return response.json()
                    }
                })
                .then(result => {
                   rendeLeagueMatchday(result,true);
                })
            }

            fetch(`${BASE_URL}/matches?matchday=${day}`, request)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(result => {
                rendeLeagueMatchday(result,false);
            }).catch(err => {
                if(navigator.onLine === true) {
                    setTimeout(() => {
                        loadMatchday(day)
                    },1000)
                }
                console.log(err);
            })
        }
}

export default loadLeague;