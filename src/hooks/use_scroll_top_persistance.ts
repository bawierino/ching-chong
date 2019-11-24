import * as React from 'react';

export const useScrollTopPersistance: (shouldSetToSavedPosition: boolean) => { saveScrollTop: () => void } = (
	shouldSetToSavedPosition
) => {
	const scrollTopRef: React.MutableRefObject<number> = React.useRef(0);

	React.useLayoutEffect(
		() => {
			if (shouldSetToSavedPosition) {
				document.documentElement.scrollTop = scrollTopRef.current;
			}
		},
		[ shouldSetToSavedPosition ]
	);

	return {
		saveScrollTop: () => {
			scrollTopRef.current = document.documentElement.scrollTop;
		}
	};
};
