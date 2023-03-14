import { prismaClient } from "../Prisma";
import type { Job } from "./AiGenerator.server";
import { type ErrorAnswer, errorHandler } from "./errorHandler";

export type ReturnAfterJobWrite = Promise<ErrorAnswer | number | {
    error: string;
}>
export async function jobWrite(uid: number, pid: number, job: Job, data: string, cid: number, needToParseJson: boolean = true): ReturnAfterJobWrite {
    const dJSON = require('dirty-json');
    try {
        let answer = null

        let readyData: string | JSON = data

        if (needToParseJson) {
            readyData = dJSON.parse(data)
        }

        switch (job) {
            case 'blogSections':
                if (!Array.isArray(readyData) || readyData.length === 0) {
                    throw new Error('Ошибка. Повторите позже')
                }

                const toWrite = readyData.map(d => ({
                    ...d,
                    chatCompletitionId: cid,
                    userId: uid,
                    projectId: pid
                }))

                console.log('jobWrite.toWrite', toWrite)

                answer = (await prismaClient.section.createMany({
                    data: toWrite
                })).count

                break;

            default:
                throw new Error('Ошибка. Повторите позже')
        }
        return answer;
    } catch (error: any) {
        return errorHandler({ message: 'Ошибка. Повторите позже', from: 'jobWrite', data: error, returnJson: true})
    }
}