'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

type LatLng = {
	lat: number;
	lng: number;
};

interface LatLngContextType {
	centerLocation: LatLng;
	setCenterLocation: (location: LatLng) => void;
}

const LatLngContext = createContext<LatLngContextType | undefined>(undefined);

interface LatLngProviderProps {
	children: ReactNode;
}

export const LatLngProvider = ({ children }: LatLngProviderProps) => {
	const [centerLocation, setCenterLocation] = useState<LatLng>({
		lat: 37.5665,
		lng: 126.978,
	});

	return (
		<LatLngContext.Provider value={{ centerLocation, setCenterLocation }}>
			{children}
		</LatLngContext.Provider>
	);
};

export const useLatLng = () => {
	const context = useContext(LatLngContext);
	if (!context) {
		throw new Error('useLatLng는 LatLngProvider 내부에서 사용되어야 합니다.');
	}
	return context;
};
