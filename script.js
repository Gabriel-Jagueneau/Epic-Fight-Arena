var oldselectionID = "home";
fileList = ['home.html','htp.html','more.json','cl.json'];

var toggleSelection = function(newID) {
    const oldItem = document.getElementById(oldselectionID);
    const newItem = document.getElementById(newID);

    oldItem.classList.toggle('selected');
    newItem.classList.toggle('selected');

    oldselectionID = newID;
    fetchFile(newID);
    history.pushState(null, '', `?${newID}`);
}

var checkFetch = function() {
    const currentUrl = window.location.href;
    const page = currentUrl.split('?')[1];
    console.log(page)
    if (page == undefined) {
        fetchFile('home');
    } else {
        toggleSelection(page);
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
            <div class="logotot">
                <h1 class="mcfont" style="font-size: 40px;">${jsonData['name']}</h1>
                <img src="https://raw.githubusercontent.com/TheGreatMegalodon/Epic-Fight-Arena/refs/heads/master/images/banners/home-banner.png" alt="">
            </div>
        </section>
        `;
    } else {
        return;
    }
}