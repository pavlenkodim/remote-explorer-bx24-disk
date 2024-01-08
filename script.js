const container = document.querySelector('.container__explorer');

let arParentDir = [],
    currentDir = 0;


async function getData (url, id) {   // Отправка запроса на получение списка элементов в папке
    const data = {
        id: id
    }

    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    if (!(await response).ok) {
        alert(`Ошибка HTTP: ${(await response).status}`);
    }

    return (await response).json();
}

function parseData (data) {
    const total = data.result.length;
    const arrVal = Object.values(data.result);
    let result = '',
        parent = '';

    arrVal.forEach(item => {
        if (item.TYPE === "folder") {
            result = `${result}
            <li class="element__nav"><a href="#" data-parent="${item.PARENT_ID}" data-id="${item.ID}" data-type="${item.TYPE}">${item.NAME}</a></li>`;
            parent = item.PARENT_ID;
        } else if (item.TYPE === "file") {
            result = `${result}
            <li class="element__nav">
                <a href="${item.DETAIL_URL}" data-parent="${item.PARENT_ID}" data-id="${item.ID}" data-type="${item.TYPE}">${item.NAME}</a>
                <span><a href="${item.DOWNLOAD_URL}" style="text-decoration: none">↓</a></span>
            </li>`;
        } else {
            result = `${result}
            <li class="element__nav"><a href="#" data-parent="${item.PARENT_ID}" data-id="${item.ID}" data-type="${item.TYPE}">${item.NAME}</a></li>`;
        }
        container.innerHTML = `${result} <br> Всего: ${total}`;
    });

    arParentDir.push(parent);
}

function getElement () {
    const element = document.querySelectorAll('.element__nav a');

    element.forEach(el => {
        if (el.dataset.type === 'folder') {
            el.addEventListener('click',event => {
                event.preventDefault();
                currentDir++;
                moveDir(el.dataset.id);
            });
        }
        if (el.dataset.type === "file") {
            // To Do: improve the function.
        }
    });
}

function getPrev () {
    const prev = document.querySelector('.prev__explorer');

    if (arParentDir[currentDir] === "957322") {
        prev.textContent = "x";
    } else {
        prev.textContent = "<";
        prev.addEventListener('click', event => event.preventDefault());
        moveDir(arParentDir[--currentDir]);
    }
}

// логика выполнения:
function moveDir (id, url = 'https://exemple.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxxx/disk.folder.getchildren.json') {
    getData(url, id)
        .then(parseData)
        .then(getElement);
}

// Первый запуск
moveDir('957322');