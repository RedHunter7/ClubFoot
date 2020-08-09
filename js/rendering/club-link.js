import loadPage from "./page.js";
import preloader from "./preloader.js";
const clubLink = () => {
    document.querySelectorAll('#club-list a').forEach(elm => {
        elm.addEventListener('click', () => {
             //loading before load content
             const body = document.getElementById('body-content');
             body.innerHTML = preloader;

             //Laad Page on clicked menu
             let page = elm.getAttribute("href").substr(1);
             console.log(page);
             loadPage(page);
        })
    })
}

export default clubLink;