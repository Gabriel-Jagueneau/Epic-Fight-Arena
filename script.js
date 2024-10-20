var oldselectionID = "home";
var toggleSelection = function(newID, file) {
    const oldItem = document.getElementById(oldselectionID);
    const newItem = document.getElementById(newID);

    oldItem.classList.toggle('selected');
    newItem.classList.toggle('selected');

    oldselectionID = newID;
    fetchFile(file);
}

async function fetchFile(file) {
    const extension = file.split('.').pop().toLowerCase();
    if (extension === 'html') {
        const htmlResponse = await fetch(`info/${file}`);
        const htmlData = await htmlResponse.text();
        console.log('Données HTML:', htmlData);
        return htmlData;
    } else if (extension === 'json') {
        const jsonResponse = await fetch(`info/${file}`);
        const jsonData = await jsonResponse.json();
        console.log('Données JSON:', jsonData);
        return jsonData;
    } else {
        return;
    }
}