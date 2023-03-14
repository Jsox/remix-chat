import { json, type TypedResponse } from "@remix-run/node";


export interface ErrorProps {
    message: string,
    from?: string,
    data?: any,
    // false by default
    returnJson?: boolean
}
export type ErrorAnswer = { error: string, data?: any; } | void

export function errorHandler(props: ErrorProps): ErrorAnswer {

    const { message, from = 'not defined', data = {}, returnJson = false } = props

    sendToTelegram(props)

    if (!returnJson) {
        throw new Error(message);
    } else {
        return { error: message, data }
    }
}

export async function sendToTelegram(obj: any): Promise<void> {
    const message = JSON.stringify(obj, null, 2)

    console.log('FROM TG', message);


    // await fetch(`https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage?chat_id=${process.env.TG_ADMIN_CHAT_ID}&text=${message}`)
    //     .catch(err => {
    //         throw new Error(err.message)
    //     })
}