import { useForceUpdate } from './use_force_update';
import React from 'react';

export const useForceUpdateOnUrlChange: () => void = () => {
	const forceUpdate = useForceUpdate();
	React.useEffect(() => {
		window.addEventListener('popstate', forceUpdate);
		return () => window.removeEventListener('popstate', forceUpdate);
	}, []);
};
