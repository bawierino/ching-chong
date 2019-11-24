class RouterService {
	public navigateToPath(path: string): void {
		window.history.pushState(undefined, '', path);
	}

	public navigateBack(): void {
		window.history.back();
	}

	public hasPath(): boolean {
		return document.location.pathname.length > 1;
	}

	public getPath(): string {
		if (this.hasPath()) {
			return document.location.pathname.split('/')[1];
		}

		return undefined;
	}
}

export const routerService = new RouterService();
