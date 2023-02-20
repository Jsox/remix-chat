import { User } from '@prisma/client';

export type NavbarSearchProps = {
    opened: boolean;
    toggle: VoidFunction;
    user: User | null;
};
