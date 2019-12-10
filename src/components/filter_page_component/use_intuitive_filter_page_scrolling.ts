import * as React from "react";
import { useScrollTopPersistance } from "../../hooks/use_scroll_top_persistance";

export const useIntuitiveFilterPageScrolling: (
    shouldSetToSavedPosition: boolean
) => { saveScrollTop: () => void } = shouldSetToSavedPosition => {
    React.useLayoutEffect(() => {
        if (!shouldSetToSavedPosition) {
            document.documentElement.scrollTop = 0;
        }
    }, [shouldSetToSavedPosition]);

    return {
        saveScrollTop: useScrollTopPersistance(shouldSetToSavedPosition).saveScrollTop
    };
};
