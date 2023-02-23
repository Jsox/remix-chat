import { Code } from '@mantine/core';
import { dataLoadingFunMessages } from 'app/data/dataLoadingFun';
import { Typewriter } from 'react-simple-typewriter';

export default function WaitingMessages() {
    return (
        <Code>
            <pre>
                ['
                <Typewriter
                    words={dataLoadingFunMessages}
                    typeSpeed={15}
                    deleteSpeed={5}
                    delaySpeed={4000}
                    cursor={true}
                />
                ']
            </pre>
        </Code>
    );
}
