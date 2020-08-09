const dbPromised = idb.open("club-foot",1,upgradeDb => {
    if(!upgradeDb.objectStoreNames.contains("club")) {
        const clubsObjectStore = upgradeDb.createObjectStore("club",{keyPath: "id"});
        clubsObjectStore.createIndex("id","id",{unique: true});
        clubsObjectStore.createIndex("name","name",{unique: false});
        clubsObjectStore.createIndex("shortName","shortName",{unique: false});
        clubsObjectStore.createIndex("crestUrl","crestUrl",{unique: false});
        clubsObjectStore.createIndex("league","league",{unique: false});
        clubsObjectStore.createIndex("clubProfile","clubProfile",{unique: false});
        clubsObjectStore.createIndex("clubSquad","clubSquad",{unique: false});
        clubsObjectStore.createIndex("clubSchedule","clubSchedule",{unique: false});
        clubsObjectStore.createIndex("clubResult","clubResult",{unique: false});
    }
})

export default dbPromised;