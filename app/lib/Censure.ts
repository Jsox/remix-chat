/**
 * //////////////
 * // CENSURE //
 * ////////////
 *
 * Dirty words - filter.
 *
 * A JavaScript lib to filter out dirty, vulgar, obscene, profane words in russian or english texts.
 *
 * Key features:
 * - Find profanity (in Russian and English texts) and hide it with *** symbols.
 * - Find profanity (in Russian texts) and replace it with normative vocabulary.
 *
 * Some examples:
 * isBad('Original text with abusive words'); // return: bool
 * replace('Original text with abusive words'); // return: string (text without abusive words)
 * fix('Original phrase with abusive words'); // return: string (fixed text)
 *
 * @author jzavorohina@yandex.ru
 *
 */

export class Censure {
    static REPLACEMENT = '***';
    static patterns_ru = [
        'анус|анус[а-я]+',
        'бзд[а-я]+',
        'бля|бля[а-я]+',
        'вафел|вафлер|вафлёр|вафлер[а-я]+|вафлёр[а-я]+|вафле[а-я]+|вафлист|вафли[а-я]+|вафлист[а-я]+',
        'вошка|вошь',
        'вздроч[а-я]+|вздрач[а-я]+',
        'вманд[а-я]+|вмуд[а-я]+',
        'впенд[а-я]+|впиз[а-я]+|пиз[а-я]+',
        'вхуя[а-я]+|вхуй[а-я]+|вхуй[а-я]+',
        'въеб[а-я]+|въебё[а-я]+|выеб[а-я]+|выёб[а-я]+',
        'высер|[а-я]+высер',
        'говн[а-я]+|говен[а-я]+|говён[а-я]+',
        'голощелка',
        'гомос[а-я]+|гомик[а-я]+|гомик',
        'гондон|гондон[а-я]+',
        'гумозник',
        'давалка|даваха',
        'дерьм[а-я]+',
        'дилдо',
        'додик',
        'доеб[а-я]+',
        'дойки',
        'долбан[а-я]+|долбежка|долбоеб[а-я]+',
        'допиз[а-я]+',
        'досос[а-я]+|досас[а-я]+',
        'доснашив[а-я]+|доснош[а-я]+',
        'досикат[а-я]+|досикив[а-я]+',
        'досир[а-я]+|доусеру|доусрач[а-я]+',
        'дрист[а-я]+|[а-я]+дрис[а-я]+',
        'дроч[а-я]+|драч[а-я]+|[а-я]+дроч[а-я]+|дрюч[а-я]+',
        'дуплиться',
        'еба[а-я]+',
        'ебеня|ебен[а-я]+',
        'ебл[а-я]+',
        'ебнут[а-я]+',
        'ерепени[а-я]+',
        'eдрёна[а-я]+|едрить|едрить[а-я]+',
        'елда',
        'ерунд[а-я]+',
        'ёб[а-я]+',
        'жид|жид[а-я]+',
        'жопа|жоп[а-я]+|жопник|жопочник|жопошник',
        'задрот|задрот[а-я]+',
        'засранец|засран[а-я]+|засеря',
        'затычка',
        'изманд[а-я]+',
        'йух',
        'клитор',
        'курва',
        'лох|лох[а-я]+',
        'манд[а-я]+|манда|монда|монда[а-я]+',
        'мерзавец',
        'мразь',
        'мудак|мудило|мудил[а-я]+|мудозвон|мудох[а-я]+',
        'наёб[а-я]+|наеб[а-я]+',
        'обосранец|обосра[а-я]+',
        'образина',
        'отребье|отрепье',
        'охуе[а-я]+',
        'падаль|падла',
        'паскуда|паскудный',
        'потаскуха',
        'пентюх',
        'пизд[а-я]+|пизда|[а-я]+пизд[а-я]+',
        'позорник',
        'порнуха',
        'полудурок',
        'потаскун|потаскуха',
        'придурок',
        'прорва',
        'пройдоха',
        'проститутка',
        'прохвост',
        'пьянчуга|пьянь',
        'разъеб[а-я]+',
        'раздолбай',
        'распизд[а-я]+',
        'рвань',
        'ренегат',
        'соси|соса[а-я]+',
        'срать',
        'ссать',
        'сука|сукин|сучка',
        'тварь',
        'тёлка',
        'толстозадый',
        'трах[ая]+',
        'тупица|тупоголовый|туполобый|тупоумный',
        'тягомотину',
        'ублюд[а-я]+',
        'уеб[а-я]+',
        'уебище',
        'урод',
        'урод[а-я]+',
        'фефела|фефёла|фефёлка',
        'фофан',
        'фуфло|фуфл[а-я]+',
        'хайло',
        'халда',
        '[а-я]+хера',
        'холуй|холуйство|холуйств[а-я]+',
        'хрыч',
        'ху|хуй|ху[а-я]+|[а-я]+хуя',
        '[а-я]+ху[а-я]+',
        'хуле',
        'хуяк[а-я]+|хуяр[а-я]+|хуяч[а-я]+',
        'целка',
        'черножопый|чернозадый|черномазый',
        'чинодрал',
        'чмо',
        'шалава',
        'шалашовка',
        'шантрапа',
        'шаромыжник',
        'шваль',
        'шизоид',
        'шлюха|шлюш[а-я]+',
        'шушера',
        'щекотильник',
        'эрекция',
        'юлда|юлдак',
        'ядрёна|ядрена',
        'ядрить',
    ];
    static patterns_en = [
        'ass',
        'asshole|arsehole',
        'bastard',
        'berk',
        'bitch|bitch[a-z]+',
        'blighter',
        'blimey',
        'bollocks',
        'bugger',
        'bullshit',
        'butt',
        'cad',
        'cock|[a-z]+cock|cock[a-z]+',
        'crap',
        'cunt',
        'damn',
        'dang',
        'darn',
        'douchebag',
        'dick|dick[a-z]+',
        'duffer',
        'dumd',
        'faggot|fag',
        'fool',
        'freak|freaking ',
        'fuck|[a-z]+fucker|fucking| fucked',
        'gay',
        'hoe',
        'homo',
        'heck',
        'idiot',
        'jerk|jerking',
        'knob[a-z]+',
        'loser',
        'motherf[a-z]+',
        'nerd',
        'nigger',
        'pillock',
        'plonker',
        'poo|poop',
        'prat',
        'prick',
        'pussy',
        'rotter',
        'shit|shits|[a-z]+shit|shit[a-z]+|[a-z]+shit[a-z]+',
        'slut',
        'stupid',
        'suck|sucker',
        'swive|swivel',
        'swine',
        'twat',
        'wanker',
        'whore',
    ];
    static replace_patterns_ru = {
        пиздёж: 'пустой лживый разговор',
        пизданутая: 'глупая',
        пиздатый: 'крутой',
        пиздато: 'хорошо',
        пизденеть: 'балдеть',
        пиздеть: 'болтать чепуху',
        пиздецовый: 'хороший',
        пиздец: 'конец', // moved due to iteration order
        пиздоболивать: 'говаривать',
        пиздоболить: 'болтать',
        хуевато: 'плоховато',
        хуеватый: 'плоховатый',
        хуев: 'презренный', // moved due to iteration order
        хуёво: 'плохо',
        хуёвый: 'плохой',
        хуёвина: 'ерунда',
        хуёвинка: 'неприятность',
        'хуё-моё': 'то да сё',
        хуеньки: 'нет',
        хуета: 'халтура',
    };

    constructor() {}

    /**
     * Searches if there any abusive words in the text
     *
     * @param {String} string - original text
     * @return {Boolean} - is there any abusive words in our string
     */
    static isBad(string) {
        var patterns = Censure.getPatterns(string);
        for (var p of patterns) {
            let regexp = Censure.prepare(p);
            if (regexp.test(string)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Replace abusive words from string
     *
     * @param {String} string - original text
     * @return {String} - cleaned text
     */
    static replace(string) {
        var words = string.split(' ');
        for (var i = 0; i < words.length; i++) {
            var w = words[i];
            var patterns = Censure.getPatterns(w);
            for (var p of patterns) {
                let regexp = Censure.prepare(p);
                if (regexp.test(w)) {
                    words[i] = words[i].replace(new RegExp('[а-яёА-ЯЁ\\w\\-]+', 'iu'), Censure.REPLACEMENT);
                }
            }
        }
        return words.join(' ');
    }

    /**
     * Fixing abusive words inside string
     *
     * @param {String} string - original text
     * @return {String} - fixed text
     */
    static fix(string) {
        var result = '';
        var patternKeys = Object.keys(Censure.replace_patterns_ru).reverse();

        for (var p of patternKeys) {
            let pattern = Censure.prepare(p);
            var replace = Censure.replace_patterns_ru[p];
            if (pattern.test(string)) {
                result = string.replace(pattern, replace);

                if (Censure.checkFirstChar(string)) {
                    result = Censure.upFirstChar(result);
                }
            }
        }
        return result;
    }

    static prepare($pattern) {
        return new RegExp($pattern, 'iu');
    }

    static getPatterns(string) {
        if (Censure.prepare('[а-я]+').test(string)) {
            return Censure.patterns_ru;
        } else if (Censure.prepare('[a-z]+').test(string)) {
            return Censure.patterns_en;
        } else {
            return [];
        }
    }

    static checkFirstChar(string) {
        var first = string.substr(0, 1);
        return first.toLowerCase() !== first;
    }

    static upFirstChar(string) {
        var words = string.split(' ');

        words[0] = words[0].slice(0, 1).toUpperCase() + words[0].slice(1);

        return words.join(' ');
    }
}
