import { Transition } from '@mantine/core';

export default function TransitionGroup({ duration = 500, mounted = true }) {
	return <Transition mounted transition='scale-y' duration={duration} timingFunction='ease'></Transition>;
}
