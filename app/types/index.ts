import { type Project, type User } from '@prisma/client';
import { type TablerIcon } from '@tabler/icons';
import { type NavBarLinks } from 'app/data/links';

export type NavbarSearchProps = {
    opened: boolean;
    toggle: VoidFunction;
    user: User | null;
    addons?: any[] | null;
    navBarLinks: NavBarLinks;
};

export type TSetNavBarOptions = Record<string, TablerIcon | string | { label: string; link: string }[] | boolean>[];

export interface IProject {
    projects: Project[] | [];
    setNavBarLinksAddon: (el: TSetNavBarOptions) => void;
}