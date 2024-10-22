var oldselectionID = "Home";
const fileList = ['Home.html','HowtoPlay.html','More.json','ChangeLog.json'];
const nameList = ['Home','HowtoPlay','More','ChangeLog']
const rawName = 'https://raw.githubusercontent.com/TheGreatMegalodon/Epic-Fight-Arena/refs/heads/master/'

var toggleSelection = function(newID, scroll=undefined) {
    
    const oldItem = document.getElementById(oldselectionID);
    const newItem = document.getElementById(newID);

    oldItem.classList.toggle('selected');
    newItem.classList.toggle('selected');

    oldselectionID = newID;
    fetchFile(newID);
    history.pushState(null, '', `?${newID}`);

    setTimeout(() => {
        scrollToElement(scroll);
    }, 200);
}

function scrollToElement(id) {
    if (!id) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        return;
    }
    var monBloc = document.getElementById(id);
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var targetY = monBloc.getBoundingClientRect().top + scrollTop - 100;
    window.scrollTo({
        top: targetY,
        behavior: "smooth"
    });
}

var checkFetch = function() {
    const currentUrl = window.location.href;
    const page = currentUrl.split('?')[1];
    if (!nameList.includes(page)) {
        fetchFile('Home');
    } else if (page.toLowerCase() == "faq") {
        toggleSelection('Home', 'faqbloc');
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
    if (extension === 'html') {  // ${rawName}
        const htmlResponse = await fetch(`info/${file}`);
        const htmlData = await htmlResponse.text();
        fetcher.innerHTML = htmlData;
    } else if (extension === 'json') {  // ${rawName}
        const jsonResponse = await fetch(`info/${file}`);
        const jsonData = await jsonResponse.json();
        id = id.split('.')[0];
        fetcher.innerHTML = `
        <section class="${id}">
            <div class="logotot">
                <h1 class="mcfont" style="font-size: 40px;">${jsonData['name']}</h1>
                <img src="${rawName}images/banners/home-banner.png" alt="">
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
        case "ChangeLog":  // ${rawName}
            const clResponse = await fetch(`${rawName}info/ChangeLog.json`);
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
        case "More": // ${rawName}
            const moreResponse = await fetch(`${rawName}info/More.json`);
            const moreData = await moreResponse.json();
            return `
                ${moreData.list.map(i => `
                    <div class="carte">
                        <div class="ClassName">
                            <div class="name mcfont">${i.name} - Items number ${i.items.length}</div>
                            <div class="dropdown">arrow_downward</div>
                        </div>
                        <div class="content">
                            ${i.items.map(j => {
                                const imageIdMatch = j.image.match(/\/([^\/]+)\.png$/);
                                const imageId = imageIdMatch ? imageIdMatch[1] : 'No ID found';
                                return `
                                    <img src="${j.image}" alt="">
                                    <div class="infos">
                                        <div class="name">${j.name} ${imageId}</div>
                                        <div class="description" id="${j.name}description"></div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    `
                ).join('')}
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
                Copied
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
                epicfightarena.ggs.gg
                <img src="${rawName}images/minecraft-icon.png" alt="">
                `;
            }, 2000);
        });
}

var makeDPD = function(id) {
    const dpQ1arrow = document.getElementById(`${id}-arrow`);
    const dpQ1 = document.getElementById(id);
    dpQ1arrow.classList.toggle('dpeddown');
    dpQ1.classList.toggle('hidden');
}