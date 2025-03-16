'use client';

import ParkInfoApi from '@/apis/parkInfoApi';
import ParkingInfoApi from '@/apis/parkingInfoApi';
import { useState, useEffect } from 'react';

const PAGE_SIZE = 1000;

const useParkingInfoData = () => {
	const [allParkingInfoData, setAllParkingInfoData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchParkingInfoData = async () => {
		setLoading(true);
		setError(null);

		try {
			// 첫 번째 요청으로 totalCount 가져오기
			const firstData = await ParkingInfoApi.get(1, PAGE_SIZE);
			const totalCount = firstData.GetParkingInfo.list_total_count;
			const totalPages = Math.ceil(totalCount / PAGE_SIZE);

			const requests = Array.from({ length: totalPages - 1 }, (_, idx) => {
				const start = (idx + 1) * PAGE_SIZE + 1;
				const end = Math.min((idx + 2) * PAGE_SIZE, totalCount);
				return ParkingInfoApi.get(start, end);
			});

			// 첫 번째 데이터 + 나머지 데이터 병합
			const results = await Promise.all(requests);
			const allData = [
				...firstData.GetParkingInfo.row,
				...results.flatMap((res) => res.GetParkingInfo.row),
			];

			setAllParkingInfoData(allData);
		} catch (err) {
			setError('Failed to fetch parking info data');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchParkingInfoData();
	}, []);

	return { allParkingInfoData, loading, error };
};

export default useParkingInfoData;
