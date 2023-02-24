import { type LoaderArgs, json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import Layout from 'app/layouts/Layout';

export async function loader({ request, params }: LoaderArgs) {
    console.log({ params });
    const { sectionSlug, projectSlug } = params;

    return json({ sectionSlug, projectSlug });
}
export default function Project() {
    const { projectSlug, sectionSlug } = useLoaderData();
    return (
        <>
            <Outlet />
            <div>{sectionSlug}</div>
        </>
    );
}
