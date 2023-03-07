import { Alert, Blockquote, Paper, Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons';
import { useState, type ReactNode } from 'react';

export default function InfoMessage({
    text,
    textAuthor = '',
    icon = <IconAlertTriangle size="2rem" />,
    title = 'Внимание!',
    ...others
}: {
    text: ReactNode;
    textAuthor?: ReactNode;
    icon?: ReactNode;
    title?: string
}) {
    const [opened, setOpened] = useState(true)
    return (

        opened ?
            <Alert
                my={'xl'}
                p={{ xs: 'xs', md: 'md', lg: 'xl', }}
                onClose={() => setOpened(false)}
                closeButtonLabel="Закрыть предупреждение"
                icon={<IconAlertTriangle size="2rem" />}
                title={<Text fz='md'>{title}</Text>}
                color="blue"
                withCloseButton
                variant="light"
                radius={'sm'} >
                <Text fz={'lg'}>{text}</Text>
            </Alert>

            : null
    );
}
        // <Paper py={'md'} px={{ xs: 'md', md: 'lg', xl: 45 }} withBorder radius={'lg'} my={'xl'} {...others}>
        //     <Blockquote pl={20} color={'primary'} cite={textAuthor} icon={icon}>
        //         <Text>{text}</Text>
        //     </Blockquote>
        //</Paper>