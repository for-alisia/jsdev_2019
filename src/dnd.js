/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const newDiv = document.createElement('div');
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const colorRandom = '#' + Math.floor(Math.random()*256*256*256).toString(16);
    const widthRandom = Math.floor(Math.random()*300 + 50);
    const heightRandom = Math.floor(Math.random()*300 + 50);
    const left = Math.floor(Math.random()*(windowWidth - widthRandom));
    const top = Math.floor(Math.random()*(windowHeight - heightRandom));

    newDiv.classList.add('draggable-div');
    newDiv.style.position = 'absolute';
    newDiv.style.backgroundColor = colorRandom;
    newDiv.style.width = widthRandom + 'px';
    newDiv.style.height = heightRandom + 'px';
    newDiv.style.top = top + 'px';
    newDiv.style.left = left + 'px';
        
    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('dragstart', function(e) {
        target.style.opacity = '0.5';
    });
    target.addEventListener('dragend', function(e) {
        target.style.top = e.pageY + 'px';
        target.style.left = e.pageX + 'px';
        target.style.opacity = '1';
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
