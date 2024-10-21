var oldselectionID = "home";
fileList = ['home.html','htp.html','more.json','cl.json'];

var toggleSelection = function(newID) {
    const oldItem = document.getElementById(oldselectionID);
    const newItem = document.getElementById(newID);

    oldItem.classList.toggle('selected');
    newItem.classList.toggle('selected');

    oldselectionID = newID; // salut
    fetchFile(newID);
    history.pushState(null, '', `?page=${newID}`);
}

var checkFetch = function() {
    const currentUrl = window.location.href;
    const currentUrlObj = new URL(currentUrl);
    const currentParams = new URLSearchParams(currentUrlObj.search);
    const page = currentParams.get('page');
    if (page == undefined) {
        fetchFile('home');
    } else {
        fetchFile(page);
    }
}

var getFile = function(name) {
    const foundFile = fileList.find(file => file.includes(name));
    return foundFile
}

async function fetchFile(id) {
    const file = getFile(id);
    const extension = file.split('.').pop().toLowerCase();
    const fetcher = document.getElementById('fetcher');

    if (extension === 'html') {
        const htmlResponse = await fetch(`info/${file}`);
        const htmlData = await htmlResponse.text();
        fetcher.innerHTML = htmlData;
    } else if (extension === 'json') {
        const jsonResponse = await fetch(`info/${file}`);
        const jsonData = await jsonResponse.json();
        id = id.split('.')[0];
        fetcher.innerHTML = `
        <section class="${id}">
            <h1 class="mcfont" style="font-size: 40px;">${jsonData['name']}</h1>
        </section>
        `;
    } else {
        return;
    }
}