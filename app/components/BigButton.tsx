import { Button, type ButtonProps } from '@mantine/core';
import { useColors } from 'app/hooks/useColors';

function BigButton(props: ButtonProps) {
    const { mainGradient } = useColors();
    return (
        <Button
            loaderPosition={'center'}
            color={'primary'}
            mt={'xl'}
            style={{ transition: 'all .3s ease' }}
            fullWidth
            size={'xl'}
            gradient={mainGradient}
            variant={'gradient'}
            radius={'xl'}
            {...props}
        />
    );
}

export default BigButton;
