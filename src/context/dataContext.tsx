'use client';

import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface Data {
	RESULT: {
		CODE: { '#text': 'INFO-000' };
		MESSAGE: { '#text': '정상 처리되었습니다' };
	};
	list_total_count: { '#text': '325' };
	row: any[];
}
interface Position {
	lat: number;
	lng: number;
}

interface DataContextType {
	dataState: Data[] | null;
	setDataState: Dispatch<SetStateAction<Data[] | null>>;
	currentPosition: Position;
	setCurrentPosition: Dispatch<SetStateAction<Position>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
	const [dataState, setDataState] = useState<Data[] | null>(null);
	const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

	const value = {
		dataState,
		setDataState,
		currentPosition,
		setCurrentPosition,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
	const context = useContext(DataContext);
	if (context === undefined) {
		throw new Error('dataAppContext is undefined');
	}
	return context;
};
