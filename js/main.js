import loadNav from "./rendering/nav.js";
import loadPage from "./rendering/page.js";
import leagues from "./data/league-name.js";
import BASE_API from "./data/base-api.js";

// Register Service Worker
const registerServiceWorker = () => {
    return navigator.serviceWorker.register('../service-worker.js')
    .then(registration => {
        console.log('Service Worker Registration success');
        return registration;
    })
    .catch(err => {
        console.log('Service Worker registration failed',err);
    })
}

// Request Permission of notification
const requestPermission = () => {
    if('Notification' in window) {
        Notification.requestPermission().then(result => {
            if(result === 'denied') {
                console.log('Notification feature not allowed');
                return;
            } else if(result === 'default') {
                console.error("The user closes the permission request dialog box");
                return;
            }

            const urlBase64ToUint8Array = (base64String) => {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                    .replace(/-/g, '+')
                    .replace(/_/g, '/');
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                for (let i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            }

            if(('PushManager') in window) {
                navigator.serviceWorker.getRegistration().then(registration => {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BIOW18VHMVEU4f2FGpQ2cNk5RfaR2HJJpQPnOWHwy07niRoj9zYX9u63-RFrBPIepU96duXrJQK5FWoCQDcdtKI")
                    }).then(subscribe => {
                        console.log('suscribe has been success with endpoint: ', subscribe.endpoint);
                        console.log('suscribe has been success with p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh'))
                        )))
                        console.log('suscribe has been success with auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth'))
                        )))
                    }).catch(e => {
                        console.log(`Can't doing suscribe `, e.message)
                    })
                })
            }
        })
    }
}
if("serviceWorker" in navigator) {
    registerServiceWorker();
    requestPermission();
} else {
    console.log("Service Worker is not supported in this browser");
}
document.addEventListener('DOMContentLoaded', () => {

    let page = window.location.hash.substring(1);
    if (page === "") page = "home";

    let sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    let dropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdown);

    const saveClubList = () => {
        leagues.forEach(leagueClubs => {
            const BASE_URL = `${BASE_API['BASE_URL']}/competitions/`;
            const API_TOKEN = BASE_API['API_KEY'];
            let request = {
                headers: {
                    'X-Auth-Token': API_TOKEN,
                }
            }

            const loadAllTeams = () => {
                fetch(`${BASE_URL}/${leagueClubs}/teams`, request)
              .then(response => {
                  console.log(response);
                  return response.json();
              })
              .then(result => {
                  sessionStorage.setItem(`league-teams-${leagueClubs}`, JSON.stringify(result) );
              }).catch(err => {
                  console.error(err);
                  setTimeout(loadAllTeams,1000);
              })
            }
            
            loadAllTeams();
        })
    }

    loadNav();
    loadPage(page);
    saveClubList();

});

window.addEventListener('hashchange', loadNav);