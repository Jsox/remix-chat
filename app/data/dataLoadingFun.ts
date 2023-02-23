const arr: string[] = [
    'Пожалуйста, не бросайте тапки в монитор - я все еще работаю над вашим запросом!',
    'Сейчас, я только причешусь и потом сразу вернусь с Вашими данными!',
    'Извините, что не загружаюсь молниеносно. Я же не бэтмен, у меня нет сверхспособностей!',
    'Если вы забудете про загрузку и пойдете пить кофе, она закончится гораздо быстрее. Это закон Мёрфи!',
    "Может, загрузится быстрее, если мы все вместе крикнем: 'Быстрее, данные, быстрее!' Ладно, я не серьезно. Не надо.",
    'Загрузка данных - это как пробежка по парку. Если не добежать до конца, то усилия пропадут напрасно!',
    'Загрузка данных – это как терпение доктора Хауса. Иногда нужно просто подождать, чтобы получить правильный диагноз.',
    'Загрузка данных – это как ждать любимую песню на радио. Но я уверена, что вы ждёте не зря.',
    'Не волнуйтесь, мы заботимся о вашем запросе, как о настоящей звезде рок-н-ролла. Скоро всё будет готово!',
    'Загрузка данных – это как наблюдать за каплей воды на стекле: вроде бы ничего не происходит, но все же происходит.',
    'Загрузка данных – это как долгое ожидание дня зарплаты: в итоге - оно того стоит!',
];

export const dataLoadingFunMessages = shuffle(arr);

function shuffle(array: [string]) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}