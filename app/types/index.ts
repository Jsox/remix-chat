import { type Project, type User } from '@prisma/client';
import { type TablerIcon } from '@tabler/icons';
import { type NavBarLinks } from 'app/data/links';
import { } from 'openai';

export type NavbarSearchProps = {
    opened: boolean;
    toggle: VoidFunction;
    addons?: any[] | null;
    navBarLinks: NavBarLinks;
};

export type TSetNavBarOptions = Record<string, TablerIcon | string | { label: string; link: string }[] | boolean>[];

export interface IProject {
    projects: Project[] | [];
    setNavBarLinksAddon: (el: TSetNavBarOptions) => void;
}

export interface CompletionResponseChoicesInnerLogprobs {
    'tokens'?: Array<string>;
    'token_logprobs'?: Array<number>;
    'top_logprobs'?: Array<object>;
    'text_offset'?: Array<number>;
}

export interface CompletionResponseChoicesInner {
    'text'?: string;
    'index'?: number;
    'logprobs'?: CompletionResponseChoicesInnerLogprobs | null;
    'finish_reason'?: string;
    'message'?: { role: string, content: string }
}

export interface CompletionResponseUsage {
    'prompt_tokens': number;
    'completion_tokens': number;
    'total_tokens': number;
}

export interface CompletionResponse {
    'id': string;
    'object': string;
    'created': number;
    'model': string;
    'choices': Array<CompletionResponseChoicesInner>;
    'usage'?: CompletionResponseUsage;
    error?: string;
}

export interface ChatCompletionResponseChoicesInner {
    'index'?: number;
    'delta': { content?: string }
    'finish_reason'?: string;
}
export interface ChatCompletionResponse {
    'id': string;
    'object': string;
    'created': number;
    'model': string;
    'choices': Array<ChatCompletionResponseChoicesInner>;
    'error'?: string;
}

export type CompletionRequestPrompt = Array<any> | Array<number> | Array<string> | string;
export type CompletionRequestStop = Array<string> | string;

export interface CompletionRequest {
    /**
     * ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models/overview) for descriptions of them.
     */
    'messages': Array<Record<string, string>>,
    'model': string;
    'prompt'?: CompletionRequestPrompt | null;
    /**
     * The suffix that comes after a completion of inserted text.
     */
    'suffix'?: string | null;
    /**
     * The maximum number of [tokens](/tokenizer) to generate in the completion.  The token count of your prompt plus `max_tokens` cannot exceed the model\'s context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
     */
    'max_tokens'?: number | null;
    /**
     * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.  We generally recommend altering this or `top_p` but not both.
     */
    'temperature'?: number | null;
    /**
     * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or `temperature` but not both.
     */
    'top_p'?: number | null;
    /**
     * How many completions to generate for each prompt.  **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
     */
    'n'?: number | null;
    /**
     * Whether to stream back partial progress. If set, tokens will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with the stream terminated by a `data: [DONE]` message.
     */
    'stream'?: boolean | null;
    /**
     * Include the log probabilities on the `logprobs` most likely tokens, as well the chosen tokens. For example, if `logprobs` is 5, the API will return a list of the 5 most likely tokens. The API will always return the `logprob` of the sampled token, so there may be up to `logprobs+1` elements in the response.  The maximum value for `logprobs` is 5. If you need more than this, please contact us through our [Help center](https://help.openai.com) and describe your use case.
     */
    'logprobs'?: number | null;
    /**
     * Echo back the prompt in addition to the completion
     */
    'echo'?: boolean | null;
    'stop'?: CompletionRequestStop | null;
    /**
     * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model\'s likelihood to talk about new topics.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
     */
    'presence_penalty'?: number | null;
    /**
     * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model\'s likelihood to repeat the same line verbatim.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
     */
    'frequency_penalty'?: number | null;
    /**
     * Generates `best_of` completions server-side and returns the \"best\" (the one with the highest log probability per token). Results cannot be streamed.  When used with `n`, `best_of` controls the number of candidate completions and `n` specifies how many to return – `best_of` must be greater than `n`.  **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
     */
    'best_of'?: number | null;
    /**
     * Modify the likelihood of specified tokens appearing in the completion.  Accepts a json object that maps tokens (specified by their token ID in the GPT tokenizer) to an associated bias value from -100 to 100. You can use this [tokenizer tool](/tokenizer?view=bpe) (which works for both GPT-2 and GPT-3) to convert text to token IDs. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.  As an example, you can pass `{\"50256\": -100}` to prevent the <|endoftext|> token from being generated.
     */
    'logit_bias'?: object | null;
    /**
     * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
     */
    'user'?: string;
}