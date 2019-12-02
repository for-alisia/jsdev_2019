/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

document.addEventListener('DOMContentLoaded', () => {
    fillTable(getCookie());
});

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    const value = filterNameInput.value.trim();

    fillTable(filterCookie(value));
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    const cookieArr = [];
    const cookieName = addNameInput.value;
    const cookieValue = addValueInput.value;
    const filterValue = filterNameInput.value.trim();

    cookieArr.push(cookieName.trim());
    cookieArr.push(cookieValue.trim());
    document.cookie = cookieArr.join('=');
    fillTable(filterCookie(filterValue));
});

// Получаем существующие cookie
function getCookie() {
    const currentCookies = document.cookie.split('; ');
    const cookiesObj = currentCookies.reduce((acc, current) => {
        const [name, value] = current.split('=');

        acc[name] = value;

        return acc;
    }, {});

    return cookiesObj;
}

// Заполняем теблицу из существующих cookie
function fillTable(cookies) {
    const fragment = document.createDocumentFragment();
    const trs = listTable.querySelectorAll('tr');

    for (let tr of trs) {
        tr.remove();
    }

    for (let cookie in cookies) {
        fragment.appendChild(createTr(cookie, cookies[cookie]));
    }

    listTable.appendChild(fragment);
}

// Создаем строку в таблице
function createTr() {
    const tr = document.createElement('tr');

    for (let arg of arguments) {
        tr.appendChild(createCell(arg));
    }

    tr.appendChild(createCellButton());
    tr.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const cookieName = this.firstElementChild.textContent;
            const cookieValue = this.firstElementChild.nextElementSibling
                .textContent;

            deleteCookie(cookieName, cookieValue);
            this.remove();
        }
    });

    return tr;
}

// Создаем ячейку в таблице
function createCell(value) {
    const cell = document.createElement('td');

    cell.textContent = value;

    return cell;
}

// Создаем кнопку в таблице
function createCellButton() {
    const button = document.createElement('button');
    const cell = document.createElement('td');

    button.textContent = 'Удалить';
    button.className = 'btn btn-danger';

    cell.appendChild(button);

    return cell;
}

// Удаляем cookie
function deleteCookie(name, value) {
    document.cookie = `${name}=${value}; max-age=0`;
}

// Проверяем совпадение строк
function isMatching(value, chunk) {
    const lowValue = value.toLowerCase().trim();
    const lowChunk = chunk.toLowerCase().trim();

    return lowValue.includes(lowChunk);
}

// Фильтруем cookie
function filterCookie(value) {
    const currentCookie = getCookie();
    const filteredCookie = {};

    if (value) {
        for (let name in currentCookie) {
            if (
                isMatching(name, value) ||
                isMatching(currentCookie[name], value)
            ) {
                filteredCookie[name] = currentCookie[name];
            }
        }

        return filteredCookie;
    }

    return currentCookie;
}
