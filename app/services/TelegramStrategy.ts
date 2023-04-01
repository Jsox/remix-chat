import type { SessionStorage } from "@remix-run/server-runtime";
import {
    type AuthenticateOptions,
    Strategy,
    type StrategyVerifyCallback,
} from "remix-auth";

/**
 * This interface declares what configuration the strategy needs from the
 * developer to correctly work.
 */
export interface TelegramStrategyOptions {
    something?: "You may need";
}

/**
 * This interface declares what the developer will receive from the strategy
 * to verify the user identity in their system.
 */
export interface TelegramStrategyVerifyParams {
    something?: "Dev may need";
}

export class TelegramStrategy<User> extends Strategy<User, TelegramStrategyVerifyParams> {
    name = "telegram";

    constructor(
        options: TelegramStrategyOptions,
        verify: StrategyVerifyCallback<User, TelegramStrategyVerifyParams>
    ) {

        super(verify);
        console.log("🚀 ~ file: TelegramStrategy.ts:31 ~ TelegramStrategy<User> ~ verify:", verify)
        console.log("🚀 ~ file: TelegramStrategy.ts:31 ~ TelegramStrategy<User> ~ options:", options)
    }

    async authenticate(
        request: Request,
        sessionStorage: SessionStorage,
        options: AuthenticateOptions
    ): Promise<User> {
        console.log("🚀 ~ file: TelegramStrategy.ts:42 ~ TelegramStrategy<User> ~ request:", request)
        console.log("🚀 ~ file: TelegramStrategy.ts:42 ~ TelegramStrategy<User> ~ sessionStorage:", sessionStorage)
        console.log("🚀 ~ file: TelegramStrategy.ts:42 ~ TelegramStrategy<User> ~ options:", options)
        return await this.failure(
            "Implement me!",
            request,
            sessionStorage,
            options
        );
        // Uncomment me to do a success response
        // this.success({} as User, request, sessionStorage, options);
    }
}