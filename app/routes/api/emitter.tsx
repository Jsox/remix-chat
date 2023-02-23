import { type LoaderFunction } from '@remix-run/node';
import { type CleanupFunction, EventStream } from 'remix-sse';

export const loader: LoaderFunction = async ({ request }) => {
    // Return the EventStream from your route loader
    return new EventStream(request, (send): CleanupFunction => {
        send('greeting', JSON.stringify({ hello: 'world' }));
        send('count', JSON.stringify({ count: 1 }));

        return () => {
            // Return a cleanup function
            // clearInterval(interval);
        };
    });
};
