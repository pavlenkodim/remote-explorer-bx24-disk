# Удаленный проводник Битрикс24 Диск

Этот JavaScript скрипт представляет собой удаленный проводник для Битрикс24 Диска, встроенный в сторонний веб-сайт. С его помощью вы можете просматривать содержимое Битрикс24 Диска без необходимости редактирования или удаления файлов. Проект получил название "Удаленный проводник Битрикс24 Диск".

## Описание проекта

Скрипт предоставляет простой и интуитивно понятный интерфейс для навигации по папкам и просмотра файлов на Битрикс24 Диске. Он поддерживает функционал просмотра содержимого папок и файлов, а также возможность скачивания файлов.

## Использование

1. Включите скрипт на своей веб-странице, добавив следующий тег `<script>` в HTML:

```
<script src="script.js"></script>
```

2. Добавьте HTML-разметку для размещения интерфейса:

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Удаленный проводник Битрикс24 Диск</title>
</head>
<body>
    <div id="wrap">
        <div>
            <a class="prev__explorer" href="#" onclick="getPrev()"><</a>
        </div>
        <div>
            <ul class="container__explorer"></ul>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

3. Используйте скрипт для просмотра файлов и папок на Битрикс24 Диске.

## Основные функции JavaScript кода

### Функция `getData(url, id)`

```
async function getData(url, id) {
    const data = {
        id: id
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        alert(`Ошибка HTTP: ${response.status}`);
    }

    return response.json();
}
```
Асинхронная функция, отправляющая запрос на сервер для получения списка элементов в указанной папке (`url`) с использованием идентификатора папки (`id`). Возвращает JSON-данные.

### Функция `parseData(data)`

```
function parseData(data) {
    const total = data.result.length;
    const arrVal = Object.values(data.result);
    let result = '',
        parent = '';

    arrVal.forEach(item => {
        if (item.TYPE === "folder") {
            // ...
        } else if (item.TYPE === "file") {
            // ...
        } else {
            // ...
        }
        container.innerHTML = `${result} <br> Всего: ${total}`;
    });

    arParentDir.push(parent);
}
```

Функция, обрабатывающая полученные данные. Создает HTML-разметку для каждого элемента (папки или файла) и обновляет содержимое `container`. Добавляет идентификатор родительской папки в массив `arParentDir`.

### Функция `getElement()`

```
function getElement() {
    const element = document.querySelectorAll('.element__nav a');

    element.forEach(el => {
        if (el.dataset.type === 'folder') {
            // ...
        }
        if (el.dataset.type === "file") {
            // ...
        }
    });
}
```

Функция, добавляющая слушателей событий для папок и файлов. Например, при клике на папку вызывается функция `moveDir` для перехода внутрь этой папки.

### Функция `getPrev()`

```
function getPrev() {
    const prev = document.querySelector('.prev__explorer');

    if (arParentDir[currentDir] === "957322") {
        prev.textContent = "x";
    } else {
        prev.textContent = "<";
        prev.addEventListener('click', event => event.preventDefault());
        moveDir(arParentDir[--currentDir]);
    }
}
```

Функция для обработки нажатия кнопки "назад". Изменяет текущую директорию и вызывает функцию `moveDir` для отображения содержимого предыдущей папки.

### Функция `moveDir(id, url)`

```
function moveDir(id, url = 'https://exemple.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxxx/disk.folder.getchildren.json') {
    getData(url, id)
        .then(parseData)
        .then(getElement);
}
```
Функция, инициирующая переход внутрь указанной папки. Использует функции `getData`, `parseData` и `getElement` для загрузки данных, их обработки и обновления интерфейса.  
Для корректной работы необходимо заменить default значение url на свое изменив доменное имя `exemple.bitrix24.ru`, id пользователя `1` и токен `xxxxxxxxxxxxxxxxx`. Или указать url на REST Битрикс24 при вызове функции.

## Первый запуск

```
moveDir('957322');
```
Вызывается при загрузке страницы для отображения содержимого корневой папки с идентификатором "957322".

## Лицензия

Этот проект распространяется под [лицензией MIT](https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_MIT). Мы приглашаем вас к участию и предлагаем внести свой вклад!