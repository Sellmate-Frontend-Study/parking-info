'use client';

import { useState } from 'react';

const useInput = () => {
	const [value, setValue] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return {
		value,
		handleChange,
	};
};

export default useInput;
