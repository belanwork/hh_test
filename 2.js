const readline = require("readline")
const rl = readline.createInterface(process.stdin)
const data = []

rl.on('line', line => {
    // Пушим в массив инпуты, 
    // которые приводим к [Начало интервала(int), Конец интервала(int)]
    data.push(line.split(' ').map(num => +num))
    if (data.length === +data[0] + 1) {
        data.shift()
        rl.close()
    }
}).on('close', () => {
    // Проходим по массиву DATA, и создаем массив вида 
    // [Время интервала (int),  Признак (int)]
    // Признак - конец интервала или начало (-1 или +1)
    const intervalsMoves = []
    for (const line of data) {
        for (const [i, num] of line.entries()) {
            intervalsMoves.push([num, i ? -1 : 1])
        }
    }
    // Сортируем массив по ВРЕМЕНИ (0 индексу)
    // в случае, если встречается одинаковое время,
    // то сортируем по ПРИЗНАКУ, при этом +1 идет вначале, а затем -1
    intervalsMoves.sort((arr1, arr2) => {
        if (arr1[0] !== arr2[0]) return arr1[0] - arr2[0]
        else return -(arr1[1] - arr2[1])
    })
    console.log(getTimeCrossing(intervalsMoves))
})


function getTimeCrossing(arr) {
    // Счетчик интервалов [
    //    Текущее кол-во интервалов,
    //    Максимальное ПЕРЕСЕЧЕНИЕ интервалов,
    //    Сколько раз повторялось максимальное ПЕРЕСЕЧЕНИЕ интервалов
    // ]
    const intervalCounter = [0, 0, 0]
        // Временные переменные [
        //     Время в памяти,
        //     Сумма времени всех повторений максимального ПЕРЕСЕЧЕНИЯ интервалов
        // ]
    const timeCounter = [0, 0]

    for (const [time, feature] of arr) {
        intervalCounter[0] += feature
        if (!~feature) {
            timeCounter[0] = time - timeCounter[0] + 1
            if (intervalCounter[1] === intervalCounter[0] + 1) {
                timeCounter[1] += timeCounter[0]
            }
        } else {
            timeCounter[0] = time
            if (intervalCounter[1] < intervalCounter[0]) {
                intervalCounter[1] = intervalCounter[0]
                timeCounter[1] = 0
                intervalCounter[2] = 1
            } else if (intervalCounter[1] === intervalCounter[0]) {
                intervalCounter[2] += 1
            }
        }
    }
    return [intervalCounter[2], timeCounter[1]].join(' ')
}