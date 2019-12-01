/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise(resolve => {
        fetch(
            'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json'
        )
            .then(response => response.json())
            .then(cities => resolve(sortCities(cities)));
    });
}
function sortCities(cities) {
    cities.sort((a, b) => {
        const firstName = a.name.toLowerCase();
        const secondName = b.name.toLowerCase();

        if (firstName < secondName) {
            return -1;
        } else if (firstName > secondName) {
            return 1;
        }

        return 0;
    });

    return cities;
}

function onLoadSuccess() {
    loadingBlock.hidden = true;
    filterBlock.style.display = 'block';
}

function onLoadError() {
    const errorText = document.createElement('div');
    const retryBtn = document.createElement('button');

    errorText.textContent = 'Не удалось загрузить города';
    retryBtn.textContent = 'Повторить';

    loadingBlock.hidden = true;
    homeworkContainer.appendChild(errorText);
    homeworkContainer.appendChild(retryBtn);

    retryBtn.addEventListener('click', () => {
        loadTowns();
        loadingBlock.hidden = false;
        retryBtn.remove();
        errorText.remove();
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    const lowFull = full.toLowerCase();
    const lowChunk = chunk.toLowerCase();

    return lowFull.includes(lowChunk);
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

const towns = loadTowns();

document.addEventListener('DOMContentLoaded', () => {
    towns
        .then(() => onLoadSuccess())
        .catch(() => onLoadError());
});

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    const inputVal = filterInput.value.trim();
    const currentList = filterResult.querySelectorAll('li');

    for (let item of currentList) {
        item.remove();
    }
    if (inputVal === '') {
        return false;
    }

    towns.then(cities => {
        const matchArray = [];
        const fragment = document.createDocumentFragment();

        cities.forEach(item => {
            if (isMatching(item.name, inputVal)) {
                matchArray.push(item.name);
            }
        });

        matchArray.forEach(item => {
            const liElem = document.createElement('li');

            liElem.textContent = item;
            fragment.appendChild(liElem);
        });

        filterResult.appendChild(fragment);
    });
});

export { loadTowns, isMatching };
