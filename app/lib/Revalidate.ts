import { useFetcher } from '@remix-run/react';

export default function Revalidate() {
    const revalidateFetcher = useFetcher()
    revalidateFetcher.submit({
        action: 'revalidate',
    },
        {
            action: 'api/revalidate',
            method: 'post'
        })
}