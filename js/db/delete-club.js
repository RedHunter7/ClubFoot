import dbPromised from "./db.js";
import loadPage from "../rendering/page.js";
const deleteClub = idClub => {
    dbPromised.then(db => {
        let tx = db.transaction('club','readwrite');
        let store = tx.objectStore('club');
        store.delete(idClub);
        return tx.complete;
    }).then(() => {
        console.log('Club has been deleted');
        M.toast({html: 'Club has been deleted'});
        localStorage.clear(`Club-${idClub}`);
        setTimeout(() => {
            loadPage("saved-club");
        },3000)
    })
}

export default deleteClub;