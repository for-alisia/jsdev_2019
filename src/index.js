/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), seconds * 1000);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise(resolve => {
        fetch(
            'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json'
        )
            .then(response => response.json())
            .then(cities => resolve(sortCities(cities)));
    });

    function sortCities(city) {
        city.sort((prev, current) => {
            if (prev.name < current.name) {
                return -1;
            } else if (prev.name > current.name) {
                return 1;
            }

            return 0;
        });

        return city;
    }
}

export { delayPromise, loadAndSortTowns };
