import { type LoaderArgs, json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import Layout from 'app/layouts/Layout';

export async function loader({ request, params }: LoaderArgs) {
    const { projectSlug } = params;

    return json({ projectSlug });
}
export default function Project() {
    const { projectSlug } = useLoaderData();
    return (
        <Layout>
            <div>$projectSlug.tsx</div>
        </Layout>
    );
}
