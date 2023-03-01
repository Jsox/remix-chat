import { type LoaderArgs, json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

export async function loader({ request, params }: LoaderArgs) {
    console.log({ params });
    const { sectionSlug, projectSlug } = params;

    return json({ sectionSlug, projectSlug });
}
export default function Section() {
    const { projectSlug, sectionSlug } = useLoaderData();
    return (
        <div>
            {projectSlug} / {sectionSlug}
        </div>
    );
}
