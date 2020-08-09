importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
if (workbox){
    console.log(`Workbox successfuly loaded`);
}
else {
    console.log(`Workbox load has been failed`);
}

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/page/home.html', revision: '1' },
    { url: '/page/league.html', revision: '1' },
    { url: '/page/club-info.html', revision: '1' },
    { url: '/page/search-club.html', revision: '1' },
    { url: '/page/saved-club.html', revision: '1' },
    { url: '/img/bundesliga-logo-icon.svg', revision: '1' },
    { url: '/img/Club_icon.png', revision: '1' },
    { url: '/img/Custom-club.svg', revision: '1' },
    { url: '/img/Football-Field.svg', revision: '1' },
    { url: '/img/Football-Field-portrait.svg', revision: '1' },
    { url: '/img/LaLiga-logo-icon.svg', revision: '1' },
    { url: '/img/league_icon.png', revision: '1' },
    { url: '/img/picture_save.png', revision: '1' },
    { url: '/img/premiere-league-logo-icon.svg', revision: '1' },
    { url: '/img/serie-A-logo-icon.svg', revision: '1' },
    { url: '/sass/materialize.min.css', revision: '1' },
    { url: '/js/materialize-js/bin/materialize.min.js', revision: '1' },
    { url: '/js/idb-2.1.3/lib/idb.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/push.js', revision: '1' },
    { url: '/js/rendering/carousel.js', revision: '1' },
    { url: '/js/rendering/home-page.js', revision: '1' },
    { url: '/js/rendering/nav.js', revision: '1' },
    { url: '/js/rendering/page.js', revision: '1' },
    { url: '/js/rendering/preloader.js', revision: '1' },
    { url: '/js/rendering/club-link.js', revision: '1' },
    { url: '/js/rendering/league-overview.js', revision: '1' },
    { url: '/js/rendering/league-standing.js', revision: '1' },
    { url: '/js/rendering/league-matchday.js', revision: '1' },
    { url: '/js/rendering/team-squad.js', revision: '1' },
    { url: '/js/rendering/team-match-schedule.js', revision: '1' },
    { url: '/js/rendering/team-match-result.js', revision: '1' },
    { url: '/js/db/db.js', revision: '1' },
    { url: '/js/db/save-club.js', revision: '1' },
    { url: '/js/db/list-saved-club.js', revision: '1' },
    { url: '/js/db/load-saved-club.js', revision: '1' },
    { url: '/js/db/delete-club.js', revision: '1' },
    { url: '/js/data/base-api.js', revision: '1' },
    { url: '/js/data/club-info-data.js', revision: '1' },
    { url: '/js/data/club-list-data.js', revision: '1' },
    { url: '/js/data/get-club-data.js', revision: '1' },
    { url: '/js/data/league-data.js', revision: '1' },
    { url: '/js/data/league-name.js', revision: '1' },
    { url: '/js/data/month-data.js', revision: '1' },
    { url: '/js/data/search-club.js', revision: '1' },
    { url: '/js/data/cache.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: 'https://fonts.googleapis.com/css2?family=Bungee&family=Roboto:wght@300;400;500;700;900&display=swap', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
]);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    new workbox.strategies.StaleWhileRevalidate()
);

self.addEventListener('push', event => {
    let body;
    if(event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    let options = {
        body: body,
        icon: "/img/icon/android-icon-512x512.png",
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push Notification',options)
    )
})