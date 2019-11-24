import { routerService } from '../services/router_service';
import * as React from 'react';

export const useRouterInitialization: () => void = () => {
	const isInitializedRef: React.MutableRefObject<boolean> = React.useRef(false);
	if (!isInitializedRef.current) {
		routerService.initialize();
		isInitializedRef.current = true;
	}
};
