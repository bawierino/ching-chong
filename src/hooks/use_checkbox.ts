import * as React from "react";

export const useCheckbox: (
    initialValue: boolean
) => {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    setChecked: (checked: boolean) => void;
} = (initialValue: boolean) => {
    const [checked, setChecked] = React.useState(initialValue);
    return {
        checked,
        onChange: event => setChecked(event.target.checked),
        type: "checkbox",
        setChecked
    };
};
