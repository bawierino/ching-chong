class RouterService {
	private readonly firstPathParameter: string = 'ezpzchinez';

	public initialize(): void {
		const { hash } = document.location;
		window.history.replaceState(undefined, '', `/${this.firstPathParameter}${hash}`);

		if (performance.navigation.type !== 1 && this.hasHash()) {
			// not reloading page and the page has a hash
			// use case: send specific word to focus via url
			// set the back state to the overview page
			window.history.pushState(undefined, '', `/${this.firstPathParameter}`);
			this.navigateToHash(hash.replace('#', ''));
		}
	}

	public navigateToHash(hash: string): void {
		window.history.pushState(undefined, '', `/${this.firstPathParameter}#${hash}`);
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
