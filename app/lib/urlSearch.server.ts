export function urlSearch(request: Request, urlSearchKeys: string[]) {
    let url = new URL(request.url);
    let params = new URLSearchParams(url.search);
    return urlSearchKeys.map(k => params.get(k))
}