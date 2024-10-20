var oldselectionID = "home";
var toggleSelection = function(newID) {
    const oldItem = document.getElementById(oldselectionID);
    const newItem = document.getElementById(newID);

    oldItem.classList.toggle('selected');
    newItem.classList.toggle('selected');

    oldselectionID = newID;
    fetchFile(newID);
}

async function fetchFile(id) {
    try {
            const jsonResponse = await fetch(`info/${id}-page.json`);
            const jsonData = await jsonResponse.json();
            console.log('Données JSON:', jsonData);
            return jsonData;
    } catch (e) {
        try {
            const htmlResponse = await fetch(`info/${id}-page.html`);
            const htmlData = await htmlResponse.text();
            console.log('Données HTML:', htmlData);
            return htmlData;
        } catch (e) {}
    }
}