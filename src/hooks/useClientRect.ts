import { RefObject, useEffect, useState } from 'react';

const useClientRect = (elementRef: RefObject<HTMLElement | null>) => {
	const [clientRect, setClientRect] = useState<DOMRect>({
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		toJSON: () => {},
	});

	useEffect(() => {
		if (elementRef.current) {
			setClientRect(elementRef.current.getBoundingClientRect());
		}
	}, [elementRef]);

	return clientRect;
};

export default useClientRect;
