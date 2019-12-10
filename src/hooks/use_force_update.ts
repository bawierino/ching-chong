import { useCallback } from "react";
import React from "react";

export const useForceUpdate: () => () => void = () => {
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    return forceUpdate;
};
