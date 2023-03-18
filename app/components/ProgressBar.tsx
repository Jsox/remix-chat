import { nprogress, NavigationProgress } from "@mantine/nprogress";
import { useNavigation } from "@remix-run/react";
import { useEffect } from "react";

export default function ProgressBar() {
    const { state, location } = useNavigation()
    
    let started = false

    // useEffect(() => {
    //     console.log("🚀 ~ file: ProgressBar.tsx:7 ~ ProgressBar ~ location:", location)
    // }, [location])

    useEffect(() => {
        // console.log({ started });

        if (state !== 'idle' && !started) {
            started = true
            // console.log('START', { started });
            nprogress.start()
            nprogress.set(10)
        }
        if (state === 'idle') {
            started = false
            // console.log('FIN', { started });
            nprogress.complete()
        }

    }, [state])

    return <NavigationProgress size={2} initialProgress={5} autoReset={false} stepInterval={100} progressLabel={'Загрузка'} />
}