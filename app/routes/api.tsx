
export async function loader() {
    throw new Response('Нет такой страницы', { status: 404 });
};



