import BASE_API from "./base-api.js";
import renderTeamSquad from "../rendering/team-squad.js";
import renderTeamResult from "../rendering/team-match-result.js";
import renderTeamSchedule from "../rendering/team-match-schedule.js";
import saveClub from "../db/save-club.js"

const loadClub = (clubName) => {

    // Feature Discovery
    const featDiscovery = document.querySelectorAll('.tap-target');
    M.TapTarget.init(featDiscovery);
    
    const fd = document.getElementById('save-feature');
    const fdInstance = M.TapTarget.getInstance(fd);

    //Click Outside FLoat Button to close feature discovery
    document.addEventListener('click', () => {
        fdInstance.close();
    })

    const deleteBtn = document.getElementById('delete');
    deleteBtn.style.display = 'none';

    const saveBtn = document.getElementById('save');

    saveBtn.addEventListener('click', () => {
        if(navigator.onLine === true) {
            saveClub(clubName);
        } else {
            M.toast({html: `Can't save club on offline mode`})
        }
    })

    const isSaved = localStorage.getItem(`Club-${clubName}`);
    if(typeof(Storage) !== undefined) {
        if (isSaved !== null) {
            saveBtn.style.display = "none";
        }
    }

    // show club navigation
    const clubNav = document.getElementById('club-nav');
    clubNav.style.display = 'initial';

    //Remove default navigation
    const defaultNav = document.getElementById('default-nav');
    defaultNav.style.display = 'none';
    
    const BASE_URL = `${BASE_API['BASE_URL']}/teams`;
    const API_TOKEN = BASE_API['API_KEY'];
    const request = {
        headers: {
            'X-Auth-Token': API_TOKEN,
        }
    }

    //Load Squad data
    const loadTeam = () => {
        if('caches' in window) {
            caches.match(`${BASE_URL}/${clubName}`)
            .then(response => {
                return response.json();
            })
            .then(result => {
                renderTeamSquad(result,true);
            })
        }

        fetch(`${BASE_URL}/${clubName}`, request)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(result => {
            renderTeamSquad(result,false);
             // Show Feature Discovery on first Experience
            const checkFeature = localStorage.getItem('featureDiscovery');
            if(typeof(Storage) !== undefined) {
                if (checkFeature === null) {
                    localStorage.setItem('featureDiscovery',true);
                    setTimeout(() => {
                        fdInstance.open();
                    },5000);
                } 
                if (isSaved !== null) {
                    if(navigator.onLine === true) {
                        saveClub(clubName);
                    }
                }
            }
        }).catch(err => {
            console.log(err);
            if(navigator.onLine === true) {
                setTimeout(loadTeam,1000);
            } 
        })
    }

    setTimeout(loadTeam,1000);

    //Load Match Result
    const loadMatchResult = () => {
        if('caches' in window) {
            caches.match(`${BASE_URL}/${clubName}/matches?status=FINISHED&limit=6`)
            .then(response => {
                return response.json();
            })
            .then(result => {
                renderTeamResult(result,clubName,true);
            })
        }
        fetch(`${BASE_URL}/${clubName}/matches?status=FINISHED&limit=6`, request)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(result => {
            renderTeamResult(result,clubName,false);
            if(typeof(Storage) !== undefined) {
                if (isSaved !== null) {
                    if(navigator.onLine === true) {
                        saveClub(clubName);
                    }
                }
            }
        }).catch(err => {
            if(navigator.onLine === true) {
                setTimeout(loadMatchResult,1000);
            } 
            console.log(err);
        })
    }

    setTimeout(loadMatchResult,1000);

    //Load Match Schedule
    const loadMatchSchedule = () => {
        if('caches' in window) {
            caches.match(`${BASE_URL}/${clubName}/matches?status=SCHEDULED&limit=6`)
            .then(response => {
                return response.json();
            })
            .then(result => {
                renderTeamSchedule(result,clubName,true);
            })
        }
        fetch(`${BASE_URL}/${clubName}/matches?status=SCHEDULED&limit=6`, request)
          .then(response => {
              console.log(response);
              return response.json();
          })
          .then(result => {
              console.log(result);
              renderTeamSchedule(result,clubName,false);
              if(typeof(Storage) !== undefined) {
                if (isSaved !== null) {
                    if(navigator.onLine === true) {
                        saveClub(clubName);
                    }
                }
            }
          }).catch(err => {
              if(navigator.onLine === true) {
                setTimeout(loadMatchSchedule,1000);
              } 
              console.log(err)
          })
    }

    setTimeout(loadMatchSchedule,1000);
}

export default loadClub;