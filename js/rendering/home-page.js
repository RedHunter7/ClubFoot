import loadPage from "./page.js";
import searchClub from "../data/search-club.js";
import preloader from "./preloader.js";

const loadHomepage = () => {
    const searchInput = document.getElementById('search-input');
            const autocomplete = document.getElementById('autocomplete');
            searchInput.addEventListener('input', () => {
                console.log(searchClub(searchInput.value));
                let clubResult = searchClub(searchInput.value);
                let result = [];

                if(clubResult['data'].length > 3) {
                    for (let index = 0; index < 3; index++) {
                        result.push(clubResult['data'][index]);    
                    }
                }

                const renderAutocomplete = data => {
                    autocomplete.style.visibility = 'visible';
                    const autocompleteUI = data.map(elm => {
                        let logoClub;
                        if(navigator.onLine === false) {
                            logoClub = "img/Custom-club.svg"
                        } else {
                            logoClub = elm['crestUrl'];
                        }
                        return `
                        <li>
                            <a href="#club-info-${elm['id']}">
                                <div class="dropdown-text">${elm['name']}</div>
                                <figure>
                                    <img src="${logoClub}" alt="club-image">
                                </figure>
                            </a>
                        </li>
                        `;
                    }).join('');

                    autocomplete.innerHTML = autocompleteUI;
                }
                
                if(clubResult['stringLength'] > 0 && clubResult['data'].length <= 3  && clubResult['status'] === 1) {
                    renderAutocomplete(clubResult['data'])
                } else if (clubResult['stringLength'] > 0 && clubResult['data'].length > 3  && clubResult['status'] === 1) {
                    renderAutocomplete(result);
                } else {
                    autocomplete.style.visibility = 'hidden';
                    autocomplete.innerHTML = '';
                }

                if(clubResult['status'] === 0) {
                    autocomplete.style.visibility = 'hidden';
                    autocomplete.innerHTML = '';
                }

                document.querySelectorAll('#autocomplete a').forEach(elm => {
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
            })
}

export default loadHomepage;