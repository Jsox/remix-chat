import { type ActionArgs, json } from '@remix-run/node';

export async function loader() {

    throw new Response('Нет такой страницы', { status: 404 });
};

export async function action({ request }: ActionArgs) {
    const form = await request.formData();
    const action = await form.get('action');

    if (!action) {
        throw new Response('Нет такой страницы', { status: 500 });
    }

    return json({ revalidate: true })
}