import { type Completition } from "@prisma/client";
import { filterAndTranslateTo } from "../filterAndTranslateTo";
import { prismaClient } from "../Prisma";
import { type ReturnAfterGenerate } from "./generateBlogSections.server";

export type Job = 'generateBlogSections' | 'generateBlogSectionTopicsTitles'

export async function jobWrite(uid: number, pid: number, job: Job, data: string, completion: Completition, needToParseJson: boolean = true): ReturnAfterGenerate {
    const dJSON = require('dirty-json');
    try {
        let answer = null

        let readyData: string | JSON = data

        if (needToParseJson) {
            readyData = dJSON.parse(data)
        }

        switch (job) {
            case 'generateBlogSections':
                if (!Array.isArray(readyData) || readyData.length === 0) {
                    throw new Error('Ничего не записано в jobWrite:generateBlogSections')
                }

                const { error, errorMessage, resultEn, resultRu } = await filterAndTranslateTo(readyData, 'ru', 'html')

                if (error) {
                    throw new Error(errorMessage)
                }

                const toWrite = resultRu.map(d => ({
                    ...d,
                    completitionId: completion.id,
                    userId: uid,
                    projectId: pid
                }))

                console.log('jobWrite.toWrite', toWrite)

                answer = (await prismaClient.section.createMany({
                    data: toWrite
                })).count

                break;

            default:
                throw new Error('Ничего не записано в jobWrite')
        }
        return answer;
    } catch (error: any) {
        console.log('jobWrite.error', error)
        return {
            error: error?.message
        }
    }
}