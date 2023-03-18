import { prismaClient } from "../Prisma";
import type { Job } from "./AiGenerator.server";
import { type ErrorAnswer, errorHandler } from "./errorHandler";
import type { Section } from '@prisma/client';

export type ReturnAfterJobWrite = Promise<ErrorAnswer | number | Section[]>
export async function jobWrite(uid: number, pid: number, job: Job, data: string, cid: number, needToParseJson: boolean = true): ReturnAfterJobWrite {
    const dJSON = require('dirty-json');
    const slugify = require('slugify')
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

                const newSections = readyData.map(async (d) => {
                    const slug = slugify(d.sectionTitle, { lower: true, locale: 'ru' })

                    const newSection: Section = {
                        ...d,
                        slug,
                        chatCompletitionId: cid,
                        userId: uid,
                        projectId: pid
                    }

                    const exists = await prismaClient.section.findFirst({
                        where: {
                            userId: uid,
                            slug
                        }
                    })
                    let written = {}

                    if (exists) {
                        return exists
                    } else {
                        written = await prismaClient.section.create({
                            data: newSection
                        })
                    }
                    return written
                })

                console.log('jobWrite.toWrite', newSections)

                answer = newSections

                break;

            default:
                throw new Error('Ошибка. Повторите позже')
        }
        return answer;
    } catch (error: any) {
        return errorHandler({ message: 'Ошибка. Повторите позже', from: 'jobWrite', data: error, returnJson: true })
    }
}