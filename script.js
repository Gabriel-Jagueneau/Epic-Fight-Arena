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
    const fetcher = document.getElementById('fetcher');

    if (extension === 'html') {
        const htmlResponse = await fetch(`info/${file}`);
        const htmlData = await htmlResponse.text();
        fetcher.innerHTML = htmlData;
    } else if (extension === 'json') {
        const jsonResponse = await fetch(`info/${file}`);
        const jsonData = await jsonResponse.json();
        fetcher.innerHTML = jsonData['hello'];
    } else {
        return;
    }
}