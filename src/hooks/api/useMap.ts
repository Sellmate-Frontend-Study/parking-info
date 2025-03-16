'use client';

import { api } from '@/api/hooks';
import { xmlToJson } from '@/utils/xmlToJson';
import { useEffect, useState } from 'react';

const useMapData = (addr: string) => {
	const [mapData, setMapData] = useState<any | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const debounce = setTimeout(() => {
			fetchUser();
		}, 500);

		return () => clearTimeout(debounce);
	}, [addr]);

	const fetchUser = async () => {
		try {
			const res = await (
				await api.get(
					`http://openapi.seoul.go.kr:8088/48616d4372626c7537326d5579724a/xml/GetParkInfo/1/100${addr ? `/${addr}` : ''}`
				)
			).text();
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(res, 'application/xml');
			const jsonResult = xmlToJson(xmlDoc.documentElement);
			console.log(jsonResult);

			setMapData(jsonResult);
		} catch (error) {
			setError(error as Error);
		} finally {
			setLoading(false);
		}
	};

	return { mapData, loading, error, refetch: fetchUser };
};

export default useMapData;
