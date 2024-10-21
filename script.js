var oldselectionID = "home";
const fileList = ['home.html','howToPlay.html','more.json','changeLog.json'];
const rawName = 'https://raw.githubusercontent.com/TheGreatMegalodon/Epic-Fight-Arena/refs/heads/master/'


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
        const htmlResponse = await fetch(`${rawName}info/${file}`);
        const htmlData = await htmlResponse.text();
        fetcher.innerHTML = htmlData;
    } else if (extension === 'json') {
        const jsonResponse = await fetch(`${rawName}info/${file}`);
        const jsonData = await jsonResponse.json();
        id = id.split('.')[0];
        fetcher.innerHTML = `
        <section class="${id}">
            <div class="logotot">
                <h1 class="mcfont" style="font-size: 40px;">${jsonData['name']}</h1>
                <img src="https://raw.githubusercontent.com/TheGreatMegalodon/Epic-Fight-Arena/refs/heads/master/images/banners/home-banner.png" alt="">
            </div>

            <div class="content">
                ${await createDataFOR(id)}
            </div>

        </section>
        `;
    } else {
        return;
    }
}

async function createDataFOR(id) {
    switch(id) {
        case "changeLog":
            const clResponse = await fetch(`${rawName}info/changeLog.json`);
            const clData = await clResponse.json();
            return `
                ${clData.logs.map(i => `
                    <div class="conte ${i.important?'important':''} ${clData.logs.indexOf(i) == 0?'latest':''}">
                        <div class="maininfo mcfont">
                            <div class="date">${i.date}</div>-<div class="date">${i.update}</div>
                            ${clData.logs.indexOf(i) == 0?'<div class="latest">Latest</div>':''}
                        </div>
                        <div class="informations">
                            <div class="globalTitle">${i.globalTitle}</div>
                            ${i.content.map(j => `
                                <div class="secondaryTitle">${j.secondaryTitle}</div>
                                <div class="changes">${j.changes.map(k => `
                                    <div class="change"><div class="tpe golden">-</div> ${k}</div>
                                `).join('')}</div>
                            `).join('')}
                        </div>
                    </div>
                    `
                ).join('')}
                `;
        
        case "more":
            const moreResponse = await fetch(`${rawName}info/more.json`);
            const moreData = await moreResponse.json();
            return `
                ${moreData.name}
                `;

        default:
            return "";
    }
}

var copyText = function(id, text) {
    const cpy = document.getElementById(id);
    navigator.clipboard.writeText(text)
        .then(() => {
            cpy.style = "background-color: lime; color: black;";
            cpy.innerHTML = `
                Copy
                <div class="dld">done_all</div>
                `;
        }).catch(() => {
            cpy.style = "background-color: red;";
            cpy.innerHTML = `
                Error
                <div class="dld">error</div>
                `;
        }).finally(() => {
            setTimeout(() => {
                cpy.style = "";
                cpy.innerHTML = `
                Copy
                <div class="dld">sports_esports</div>
                `;
            }, 1500);
        });
}

