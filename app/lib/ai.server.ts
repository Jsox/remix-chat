import { ChatGPTAPI } from 'chatgpt';
import type { ChatMessage, SendMessageOptions } from 'chatgpt';
import { type User, type ChatMessages as PrismaChatMessage } from '@prisma/client';
import { prismaClient } from './Prisma';

// const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv').config();

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

export class OpenAI {
    promptPrefix: string;
    userLabel: string;
    assistantLabel: string;
    static userId: number;
    errorText: string;
    timeoutMs: number;
    api: ChatGPTAPI;
    static model: string;
    maxResponseTokens: number = 200;
    maxResponseTokens: number = 200;
    debug: boolean;

    constructor(opts: { debug: boolean; userId: number; model: string }) {
        const { userId, model, debug } = opts;

        OpenAI.userId = userId;

        if (!OpenAI.userId) {
            throw new Error(`Invalid user`);
        }

        this.promptPrefix =
            'The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. Answer shortly.';

        this.errorText = '<code>Извините, я ушла припудрить носик на некоторое время 😊\n\nСкоро вернусь</code> 😘';

        this.userLabel = `User-${OpenAI.userId}`;

        this.assistantLabel = `Aisha`;

        this.timeoutMs = 10 * 1000;

        OpenAI.model = model || 'text-davinci-003';

        this.debug = debug || false;

        this.api = new ChatGPTAPI({
            apiKey: process.env.OPENAI_API_KEY || '',
            completionParams: {
                max_tokens: 60,
                model: OpenAI.model,
            },
            maxResponseTokens: this.maxResponseTokens,
            userLabel: this.userLabel,
            assistantLabel: this.assistantLabel,
            getMessageById: this.getChatMessage,
            upsertMessage: this.createChatMessage,
            debug: this.debug,
        });
    }

    async getChatMessage(id: string): Promise<PrismaChatMessage | null> {
        const where = {
            messageId: id,
        };
        let message = await prismaClient.chatMessage.findUnique({
            where,
        });

        if (message) {
            message.id = id;
        }
        return message;
    }

    async createChatMessage(m: ChatMessage): Promise<PrismaChatMessage | null> {
        if (!OpenAI.userId) {
            throw new Error(`Invalid user`);
        }

        const date = m?.detail?.usage.created ? new Date(m?.detail?.usage.created) : new Date(Date.now());

        const temp = {
            messageId: m.id,
            user: {
                connect: {
                    id: OpenAI.userId,
                },
            },
            messageBy: m.role === 'user' ? 'User' : 'AI',
            text: m.text,
            parentMessageId: m.parentMessageId || null,
            conversationId: m.conversationId,
            promptTokens: m?.detail?.usage.prompt_tokens || null,
            completionTokens: m?.detail?.usage.completion_tokens || null,
            totalTokens: m?.detail?.usage.total_tokens || null,
            created: date,
            model: OpenAI.model,
        };
        let message = await prismaClient.chatMessage.create({ data: temp });

        return message;
    }

    async getLastMessage(): Promise<PrismaChatMessage | null> {
        const where = {
            user: {
                id: OpenAI.userId,
            },
        };

        let message = await prismaClient.chatMessage.findFirst({
            where,
            orderBy: {
                created: 'desc',
            },
        });
        return message;
    }

    async get(prompt: string): Promise<any> {
        const lastMessage = await this.getLastMessage();
        let opts: SendMessageOptions = {
            parentMessageId: lastMessage?.messageId,
            conversationId: lastMessage?.conversationId,
            promptPrefix: this.promptPrefix,
        };

        console.log({ lastMessage });

        const res = await this.api.sendMessage(prompt, opts);
        return res;
    }
}
