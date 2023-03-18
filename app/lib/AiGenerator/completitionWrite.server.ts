import { type ChatCompletition } from '@prisma/client';
import { type ChatCompletionResponse } from '../../types/index';
import { prismaClient } from '../Prisma';
import { type ErrorAnswer, errorHandler } from './errorHandler';
import { fromTextToTokens } from './AiGenerator.server';

export async function completionWrite(uid: number, query: string, completion: ChatCompletionResponse, chatCompletionText: string, totalTokens: number): Promise<ChatCompletition | ErrorAnswer> {
    try {
        const data: ChatCompletition = {
            query,
            answer: chatCompletionText,
            created: completion?.created ? new Date(completion?.created) : new Date(Date.now()),
            totalTokens,
            messageId: completion.id,
            userId: uid,
        }

        return await prismaClient.chatCompletition.create({
            data
        })
    } catch (error: any) {
        return errorHandler({ message: 'Ошибка. Попробуйте позже', from: 'completionWrite', data: error, returnJson: true })
    }
}