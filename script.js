var oldselectionID = "home";
var toggleSelection = function(newID) {
    const oldItem = document.getElementById(oldselectionID);
    const newItem = document.getElementById(newID);

    oldItem.classList.toggle('selected');
    newItem.classList.toggle('selected');

    oldselectionID = newID;
    showSelection(newID);
}

var getExtension = function(id) {
    let extension;
    try {
        JSON.parse(`info/${id}-page.json`);
        extension = ".json";
    } catch(e) {
        extension = ".html";
    }
    console.log(`info/${id}-page${extension}`)
    return extension
}
info/htp-page.html
var showSelection = function(id) {
    extension = getExtension(id);
    fetch(`info/${id}-page${extension}`)
        .then(response => response.json())
        .then(data => {
            
        });
}