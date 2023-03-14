import { json, type LoaderArgs } from "@remix-run/node";
import { emitter } from "app/services/emitter";
import { eventStream } from "remix-utils";

export function loader({ request, params }: LoaderArgs) {
    const { uniqueUserString } = params
    console.log('from emitter', uniqueUserString);
    
    if (!uniqueUserString) throw json(null, 404);

    return eventStream(request.signal, function setup(send) {
        function listener(value: string) {
            send({ data: value });
        }

        emitter.on(uniqueUserString, listener);

        return function cleanup() {
            emitter.off(uniqueUserString, listener);
        };
    });
}