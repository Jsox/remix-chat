import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

dayjs.locale('ru');
dayjs.extend(relativeTime);

export function useTime(dateString: number | string | Date) {
    return {
        fromNow: dayjs(dateString).fromNow(),
        formatString: dayjs(dateString).format('D MMMM YYYYг. в HH:mm'),
    };
}
