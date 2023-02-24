import { PrismaClient } from '@prisma/client';
import { Yandex } from 'yandex-cloud-translate';
import { Censure } from './Censure';

interface IFilteredTranslated {
    error: boolean;
    errorMessage: string;
    resultRu?: input;
    resultEn?: input;
}
type input = string | string[] | object | object[];

export const filterAndTranslateTo = async function (
    input: input,
    to: 'ru' | 'en',
    format: 'text' | 'html' = 'html'
): Promise<IFilteredTranslated> {
    const answer: IFilteredTranslated = {
        error: false,
        errorMessage: '',
        resultRu: to === 'en' ? input : '',
        resultEn: to === 'ru' ? input : '',
    };

    let texts: string[] | object[] = [];

    const isArray = Array.isArray(input);

    if (!isArray) {
        texts.push(input);
    } else {
        texts = input;
    }

    let foundBadWords = false;

    texts.forEach((str) => {
        if (!str) {
            answer.error = true;
            answer.errorMessage = 'Неверный текст';
        }

        if (typeof str === 'object' && !Array.isArray(str)) {
            for (const key in str) {
                if (Object.prototype.hasOwnProperty.call(str, key)) {
                    const element = str[key];
                    if (!element) {
                        answer.error = true;
                        answer.errorMessage = 'Неверный текст';
                    } else {
                        foundBadWords = Censure.isBad(element);
                        if (foundBadWords) {
                            answer.error = true;
                            answer.errorMessage = 'Найдены плохие слова... ай-яй-яй';
                        }
                    }
                }
            }
        }
        if (typeof str === 'string') {
            foundBadWords = Censure.isBad(str);
            if (foundBadWords) {
                answer.error = true;
                answer.errorMessage = 'Найдены плохие слова... ай-яй-яй';
            }
        }
    });

    if (!answer.error) {
        let translatedArray = [];
        for (const str of texts) {
            if (typeof str === 'object' && !Array.isArray(str)) {
                let translatedObject = {};

                for (const key in str) {
                    if (Object.prototype.hasOwnProperty.call(str, key)) {
                        const element = str[key];
                        const translated = await translate(element, to, format);
                        translatedObject[key] = translated;
                    }
                }

                translatedArray.push(translatedObject);
            }

            if (typeof str === 'string') {
                const translated = await translate(str, to, format);
                translatedArray.push(translated);
            }
        }

        if (to === 'en') {
            answer.resultEn = isArray ? translatedArray : translatedArray[0];
        } else {
            answer.resultRu = isArray ? translatedArray : translatedArray[0];
        }
    }

    console.log({ answer });

    return answer;
};

const Ya = new Yandex();
let prisma: PrismaClient = new PrismaClient();

async function translate(str: string, to: 'ru' | 'en', format: 'text' | 'html') {
    var md5 = require('md5');
    const hash: string = md5(str);

    const exists = await prisma.translate.findFirst({
        where: { hash },
    });

    if (exists) {
        console.log('RETURNED!', exists);
        return to === 'en' ? exists.en : exists.ru;
    }

    const translated = await Ya.translate({ texts: str, to, format });

    let created = await prisma.translate.create({
        data: {
            hash,
            ru: to === 'en' ? str : translated,
            en: to === 'ru' ? str : translated,
        },
    });
    console.log('CREATED!', created);

    return translated;
}
