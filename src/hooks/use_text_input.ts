import * as React from 'react';

export const useTextInput: (
	initialValue: string
) => {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	type: string;
	setValue: (value: string) => void;
} = (initialValue: string) => {
	const [ value, setValue ] = React.useState(initialValue);
	return {
		value,
		onChange: (event) => setValue(event.target.value),
		type: 'text',
		setValue
	};
};
