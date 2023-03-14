import type { LoaderArgs } from "@remix-run/node";
import { emitter } from "app/services/emitter";
import { eventStream } from "remix-utils";

export function loader({ request }: LoaderArgs) {
    return eventStream(request.signal, function setup(send) {
        function listener(value: string) {
            send({ data: value });
        }

        emitter.on("message", listener);

        return function cleanup() {
            emitter.off("message", listener);
        };
    });
}