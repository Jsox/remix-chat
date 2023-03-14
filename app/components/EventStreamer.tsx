import { Box, Code, ScrollArea } from '@mantine/core'
import { useOutletContext } from '@remix-run/react'
import { useEffect, useState } from 'react';
import { Prism } from '@mantine/prism';
import { useEventSource } from 'remix-utils';

function EventStreamer() {
    const { uniqueUserString }: any = useOutletContext()
    const eventStreamPersonalMessage = useEventSource(`/sse/user/${uniqueUserString}`);

    const [message, setMessage] = useState('')

    useEffect(() => {
        if (eventStreamPersonalMessage) {
            setMessage(prev => `${prev}${eventStreamPersonalMessage.replace(/\\n/g, "\n") }`)
        }
    }, [eventStreamPersonalMessage])

    return (
        <>
            {
                !!message.length &&
                <ScrollArea>
                    <Box mah={'400px'}>
                        <Prism
                            copyLabel="Скопировать в буфер обмена"
                            copiedLabel="Скопировано"
                            withLineNumbers language="json"
                            children={message} />
                    </Box>
                </ScrollArea>
            }
        </>
    )
}

export default EventStreamer