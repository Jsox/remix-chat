import { startNavigationProgress, setNavigationProgress, completeNavigationProgress, NavigationProgress } from "@mantine/nprogress";
import { useTransition } from "@remix-run/react";
import { useEffect } from "react";

export default function ProgressBar() {
    const { state, type, submission, location } = useTransition()
    let started = false

    useEffect(() => {
        // console.log({ started });

        if (state !== 'idle' && !started) {
            started = true
            // console.log('START', { started });
            startNavigationProgress()
            setNavigationProgress(10)
        }
        if (state === 'idle') {
            started = false
            // console.log('FIN', { started });
            completeNavigationProgress()
        }

    }, [state])

    return <NavigationProgress size={2} initialProgress={5} autoReset={false} stepInterval={100} progressLabel={'Загрузка'} />
}