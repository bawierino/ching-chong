class RouterService {
	private readonly firstPathParameter: string = 'ezpzchinez';

	public initialize(): void {
		if (!document.location.pathname.startsWith(`/${this.firstPathParameter}`)) {
			window.history.replaceState(undefined, '', `/${this.firstPathParameter}`);
		}
	}

	public navigateToPath(path: string): void {
		window.history.pushState(undefined, '', `/${this.firstPathParameter}/${path}`);
		window.dispatchEvent(new Event('popstate'));
	}

	public navigateBack(): void {
		window.history.back();
	}

	public hasPath(): boolean {
		return document.location.pathname.replace(`/${this.firstPathParameter}`, '').length > 1;
	}

	public getPath(): string {
		if (this.hasPath()) {
			return document.location.pathname.split('/')[2];
		}

		return undefined;
	}
}

export const routerService = new RouterService();
