'use client';

import useKakaoMap from '@/hooks/useKakaoMap';
import { useParkInfo } from '@/providers/ParkInfoProvider';
import { MarkerType } from '@/types/marker';
import { calculateHaversineDistance } from '@/utils/calculateHaversinceDistance';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import Modal from './atoms/Modal';
import ParkingInfoDetail from './ParkingInfoDetail';
import { ParkInfo } from '@/types/parkInfo';
import { ParkingInfo } from '@/types/parkingInfo';

export interface SelectedPark {
	parkInfo: ParkInfo;
	realTimeInfo?: ParkingInfo;
}

const getTrafficState = (available: number, total: number): MarkerType => {
	if (total === 1) return 'normal';
	const ratio = available / total;
	if (available >= total) return 'jammed';
	if (ratio > 0.7) return 'congested';
	if (ratio > 0) return 'smooth';
	return 'normal';
};

const KakaoMap = () => {
	const mapRef = useRef<HTMLDivElement>(null);
	const { RADIUS, centerLocation, initMap, setMarker } = useKakaoMap();
	const { parkInfos, parkingInfos } = useParkInfo();
	const [selectedPark, setSelectedPark] = useState<SelectedPark | null>(null);

	useEffect(() => {
		if (!parkInfos) return;

		const targetParkInfos = parkInfos.filter((parkInfo) => {
			const distance = calculateHaversineDistance({
				lat1: centerLocation.lat,
				lng1: centerLocation.lng,
				lat2: parkInfo.LAT,
				lng2: parkInfo.LOT,
			});
			return distance <= RADIUS;
		});

		targetParkInfos.forEach((parkInfo) => {
			const realTimeInfo = parkingInfos?.find(
				(info) => info.PKLT_NM === parkInfo.PKLT_NM && info.ADDR === parkInfo.ADDR
			);

			const state = realTimeInfo
				? getTrafficState(realTimeInfo.NOW_PRK_VHCL_CNT, realTimeInfo.TPKCT)
				: 'normal';

			setMarker({
				lat: parkInfo.LAT,
				lng: parkInfo.LOT,
				state,
				clickEvent: () => {
					setSelectedPark({ parkInfo, realTimeInfo });
				},
			});
		});
	}, [centerLocation, parkInfos, parkingInfos, RADIUS, setMarker]);

	const handleCloseModal = () => {
		setSelectedPark(null);
	};

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=clusterer`}
				onLoad={() => mapRef.current && initMap(mapRef.current)}
			/>
			<SearchBar />
			<div
				ref={mapRef}
				className='h-full w-full'
			></div>

			{selectedPark && (
				<Modal
					isOpen={!!selectedPark}
					onClose={handleCloseModal}
				>
					<ParkingInfoDetail
						parkInfo={selectedPark.parkInfo}
						realTimeInfo={selectedPark.realTimeInfo}
					/>
				</Modal>
			)}
		</>
	);
};

export default KakaoMap;
