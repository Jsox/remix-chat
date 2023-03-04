import { Blockquote, Paper } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons';
import { type ReactNode } from 'react';

export default function InfoMessage({
    text,
    textAuthor = '',
    icon = <IconAlertTriangle size="2rem" />,
    ...others
}: {
    text: ReactNode;
    textAuthor?: ReactNode;
    icon?: ReactNode;
}) {
    return (
        <Paper p={'md'} withBorder radius={'lg'} my={'xl'} {...others}>
            <Blockquote color={'primary'} cite={textAuthor} icon={icon}>
                {text}
            </Blockquote>
        </Paper>
    );
}
