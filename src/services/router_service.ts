class RouterService {
	private readonly firstPathParameter: string = 'ezpzchinez';

	public initialize(): void {
		if (!document.location.pathname.startsWith(`/${this.firstPathParameter}`)) {
			window.history.replaceState(undefined, '', `/${this.firstPathParameter}`);
		}
	}

	public navigateToHash(path: string): void {
		window.history.pushState(undefined, '', `/${this.firstPathParameter}#${path}`);
		window.dispatchEvent(new Event('popstate'));
	}

	public navigateBack(): void {
		window.history.back();
	}

	public hasHash(): boolean {
		const partAfterHash = document.location.hash.replace(`#`, '');
		return partAfterHash.length > 1;
	}

	public getHash(): string {
		if (this.hasHash()) {
			return document.location.hash.split('#')[1];
		}

		return undefined;
	}
}

export const routerService = new RouterService();
