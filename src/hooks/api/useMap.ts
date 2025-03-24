'use client';

import { api } from '@/api/hooks';
import { useEffect, useState } from 'react';

const useMapData = () => {
	const [mapData, setMapData] = useState<any | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async (index: number) => {
		return (await (
			await api.get(
				`http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_SEOUL_API_KEY}/json/GetParkInfo/${index * 1000 + 1}/${(index + 1) * 1000}`
			)
		).json()) as { GetParkInfo: any };
	};

	const fetchTotalData = async () => {
		try {
			const res = await fetchData(0);

			const totalRequests = Math.ceil(res.GetParkInfo.list_total_count / 1000);
			const requests = [...res.GetParkInfo.row];

			for (let i = 1; i < totalRequests; i++) {
				const res = await fetchData(i);
				requests.push(...res.GetParkInfo.row);
			}

			setMapData(requests);
		} catch (error) {
			setError(error as Error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// const debounce = setTimeout(() => {
		fetchTotalData();
		// }, 500);

		// return () => clearTimeout(debounce);
	}, []);

	return { mapData, loading, error, refetch: fetchData };
};

export default useMapData;
