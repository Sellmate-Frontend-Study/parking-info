'use client';

import ParkInfoApi from '@/apis/parkInfoApi';
import { useState, useEffect } from 'react';

const PAGE_SIZE = 1000;

const useParkInfoData = () => {
	const [allParkInfoData, setAllParkInfoData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchParkInfoData = async () => {
		setLoading(true);
		setError(null);

		try {
			// 첫 번째 요청으로 totalCount 가져오기
			const firstData = await ParkInfoApi.get(1, PAGE_SIZE);
			const totalCount = firstData.GetParkInfo.list_total_count;
			const totalPages = Math.ceil(totalCount / PAGE_SIZE);

			const requests = Array.from({ length: totalPages - 1 }, (_, idx) => {
				const start = (idx + 1) * PAGE_SIZE + 1;
				const end = Math.min((idx + 2) * PAGE_SIZE, totalCount);
				return ParkInfoApi.get(start, end);
			});

			// 첫 번째 데이터 + 나머지 데이터 병합
			const results = await Promise.all(requests);
			const allData = [...firstData.GetParkInfo.row, ...results.flatMap((res) => res.GetParkInfo.row)];

			setAllParkInfoData(allData);
		} catch (err) {
			setError('Failed to fetch park info data');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchParkInfoData();
	}, []);

	return { allParkInfoData, loading, error };
};

export default useParkInfoData;
