var oldselectionID = "Home";
const fileList = ['Home.html','HowtoPlay.html','More.html','ChangeLog.json'];
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
    setTimeout(() => {scrollToElement(scroll)}, 100);
}

var copyText = function(id, text) {
    const cpy = document.getElementById(id);
    const oldInner = cpy.innerHTML;
    navigator.clipboard.writeText(text)
        .then(() => {
            cpy.style = "background-color: lime; color: black;";
            cpy.innerHTML = `Copied`;
        }).catch(() => {
            cpy.style = "background-color: red;";
            cpy.innerHTML = `Error`;
        }).finally(() => {
            setTimeout(() => {
                cpy.style = "";
                cpy.innerHTML = oldInner;
            }, 2000);
        });
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

var makeDPD = function(id) {
    const dpQ1arrow = document.getElementById(`${id}-arrow`);
    const dpQ1 = document.getElementById(id);
    dpQ1arrow.classList.toggle('dpeddown');
    dpQ1.classList.toggle('hidden');
}

async function makeFAQ() {
    const container = document.getElementById('faq-load');
    const jsonResponse = await fetch(`info/FAQ-questions.json`);
    const data = await jsonResponse.json();
    container.innerHTML = `
        ${data.map((el, index) => `
            <div class="contain">
                <div class="question" onclick="makeDPD('dp-Q${index}')">
                    <div class="name mcfont">${el.Q}</div>
                    <div class="dropdown" id="dp-Q${index}-arrow">&#8250;</div>
                </div>
                <div id="dp-Q${index}" class="dp hidden">
                    <div class="sepa"></div>
                    <div class="answer">${el.A.replace(/§/g, '"')}</div>    
                </div>
            </div>
        `).join('')}`;
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
    fetcher.innerHTML = '';
    if (extension === 'html') {  // ${rawName}
        const htmlResponse = await fetch(`info/${file}`);
        const htmlData = await htmlResponse.text();
        fetcher.innerHTML = htmlData;
        if (file == 'Home.html') makeFAQ();
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
                ${jsonData.logs.map(i => `
                    <div class="conte ${i.important?'important':''} ${jsonData.logs.indexOf(i) == 0?'latest':''}">
                        <div class="maininfo mcfont">
                            <div class="date">${i.date}</div> <span>-</span> <div class="date">${i.update}</div>
                            ${jsonData.logs.indexOf(i) == 0?'<div class="latest">Latest</div>':''}
                        </div>
                        <div class="informations">
                            <div class="globalTitle">${i.globalTitle}</div>
                            ${i.content.map(j => `
                                <div class="secondaryTitle">${j.secondaryTitle}</div>
                                <div class="changes">${j.changes.map(k => `
                                    <div class="change before">${k}</div>
                                `).join('')}</div>
                            `).join('')}
                        </div>
                    </div>
                    `
                ).join('')}
            </div>
        </section>
        `;
    } else {
        return;
    }
}