import {
    IconGauge,
    IconWritingSign,
    IconCalendarStats,
    IconPresentationAnalytics,
    IconFileAnalytics,
    IconAdjustments,
    IconLock,
    type TablerIcon,
    IconSpeakerphone,
} from '@tabler/icons';

export type NavBarLinks = {
    label: string;
    icon: TablerIcon;
    link?: string | null;
    initiallyOpened?: undefined;
    links?:
        | {
              label: string;
              link: string;
          }[]
        | null;
}[];

export const navBarLinks: NavBarLinks = [
    { label: 'Главная', icon: IconGauge, link: '/' },
    { label: 'Общий чат с Аишей', icon: IconSpeakerphone, link: '/public/chat' },
    {
        label: 'Сгенерировать тексты',
        icon: IconWritingSign,
        initiallyOpened: true,
        links: [
            { label: 'Проект блога', link: '/generate/project' },
            { label: 'AI21', link: '/generate/ai21' },
            { label: 'Outlook', link: '/' },
            { label: 'Real time', link: '/' },
        ],
    },
];

export const dataFooterLinks = [
    {
        title: 'Фотосессии',
        links: [
            {
                label: 'Свадебные',
                link: '/wedding',
            },
            {
                label: 'About us 2',
                link: '/about2',
            },
        ],
    },
    {
        title: 'About',
        links: [
            {
                label: 'About us',
                link: '/about',
            },
            {
                label: 'About us 2',
                link: '/about2',
            },
        ],
    },
];

export const headerTopLinks = {
    userLinks: [
        {
            label: 'first',
            link: '/first',
        },
    ],
    mainLinks: [
        {
            label: 'Main page',
            link: '/',
        },
        {
            label: 'More',
            link: '/more',
            links: [
                {
                    label: 'About us',
                    link: '/about1',
                },
                {
                    label: 'About us',
                    link: '/about2',
                },
            ],
        },
        {
            label: 'About us',
            link: '/about',
        },
    ],
};
