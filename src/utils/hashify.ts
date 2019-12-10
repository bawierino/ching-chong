export function hashify(input: string): string {
    let hash = 0;
    if (input.length === 0) {
        return hash.toString();
    }
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash.toString();
}
