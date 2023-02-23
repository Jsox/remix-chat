export default function clearTextForJson(str: string) {
    return (str = str.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\n\s\S]*?\*\/)/g, (m, g) => (g ? '' : m)));
}
