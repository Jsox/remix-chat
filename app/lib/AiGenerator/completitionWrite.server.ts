import { type Completition } from '@prisma/client';
import { type CompletionResponse } from '../../types/index';
import { prismaClient } from '../Prisma';
export async function completionWrite(uid: number, query: string, completion: CompletionResponse): Promise<Completition | { error: string; }> {
    try {
        const data = {
            query,
            answer: completion.choices[0]?.text || '',
            created: completion?.created ? new Date(completion?.created) : new Date(Date.now()),
            promptTokens: completion.usage?.prompt_tokens,
            completionTokens: completion.usage?.completion_tokens,
            totalTokens: completion.usage?.total_tokens,
            messageId: completion.id,
            User: {
                connect: { id: uid }
            }
        }

        return await prismaClient.completition.create({
            data
        })
    } catch (error: any) {
        return {
            error: error?.message
        }
    }
}