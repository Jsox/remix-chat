import { type User } from '@prisma/client';
import { type NavBarLinks } from 'app/data/links';

export type NavbarSearchProps = {
    opened: boolean;
    toggle: VoidFunction;
    user: User | null;
    addons?: any[] | null;
    navBarLinks: NavBarLinks;
};
