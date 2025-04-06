'use client';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

interface LocaleInterface {
	lat: number;
	lng: number;
}

interface LocaleContextType {
	locale: LocaleInterface | null;
	setLocale: Dispatch<SetStateAction<LocaleInterface | null>>;
	radius: number;
	setRadius: Dispatch<SetStateAction<number>>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
	const [locale, setLocale] = useState<LocaleInterface | null>(null);
	const [radius, setRadius] = useState(500);

	const value = { locale, setLocale, radius, setRadius };

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
	const context = useContext(LocaleContext);
	if (context === undefined) {
		throw new Error('dataAppContext is undefined');
	}

	return context;
};
