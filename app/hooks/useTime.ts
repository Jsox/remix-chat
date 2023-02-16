import moment from 'moment';
import { useState, useEffect } from 'react';

export function useTime(dateString: number | string) {
    moment.locale('ru');

    // const [timeAgo, settimeAgo] = useState(moment(dateString).fromNow());
    const timeAgo = moment(dateString).fromNow();

    // useEffect(() => {
    // 	const interval = setInterval(() => {
    // 		settimeAgo(moment(dateString).fromNow());
    // 		// console.log(timeAgo);
    // 	}, 45000);

    // 	return () => {
    // 		console.log('cleared interval');
    // 		clearInterval(interval);
    // 	};
    // });

    // return {
    //     timeAgo,
    // };
    return moment(dateString).fromNow();
}
