import { type LoaderArgs, json, redirect } from '@remix-run/node';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import { IconListDetails } from '@tabler/icons';
import Layout from 'app/layouts/Layout';
import auth from 'app/services/auth.server';
import { useEffect } from 'react';

export async function loader({ request, params }: LoaderArgs) {
    const { projectSlug } = params;
    return json({ projectSlug });
}
export default function Project() {
    const { projects, setNavBarLinksAddon } = useOutletContext();
    let temp = [];
    if (projects?.length) {
        const links = projects.map((project) => {
            return {
                label: project.title,
                link: '/generate/project/' + project.url,
            };
        });
        temp.push({
            label: 'Проекты',
            icon: IconListDetails,
            links,
            initiallyOpened: true,
        });
    }
    useEffect(() => {
        setNavBarLinksAddon(temp);
    });
    const { projectSlug } = useLoaderData();
    return <div>{projectSlug}</div>;
}
