import loadPage from "./page.js";
import preloader from "./preloader.js"
const loadNav = () => {
    //Register event listener for every menu
    document.querySelectorAll("#league a, #club a, #home-link, .sidenav a").forEach(elm => {
        elm.addEventListener("click", () => {

            //Close sidenav
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            //Load Preloader before Load Page
            const body = document.getElementById('body-content');
            body.innerHTML = preloader;

            //Laad Page on clicked menu
            let page = event.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
}

export default loadNav;