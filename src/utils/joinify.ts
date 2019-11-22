export function joinify(strings: undefined | string | string[]): string | undefined {
	return Array.isArray(strings) ? strings.join(', ') : strings;
}
