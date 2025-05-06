'use client';

import useKakaoMap from '@/hooks/useKakaoMap';
import { useParkInfo } from '@/providers/ParkInfoProvider';
import { calculateHaversineDistance } from '@/utils/calculateHaversinceDistance';
import { getParkingKey } from '@/utils/getParkingKey';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import SearchBar from '../SearchBar';
import ParkingInfoDetail from '../ParkingInfoDetail';
import { ParkInfo } from '@/types/parkInfo';
import { ParkingInfo } from '@/types/parkingInfo';
import { getTrafficState } from '@/utils/getTrafficState';
import ParkingList from '../ParkingList';

export interface SelectedPark {
	parkInfo: ParkInfo;
	realTimeInfo?: ParkingInfo;
}

const KakaoMap = () => {
	const mapRef = useRef<HTMLDivElement>(null);
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [parkInfosInCircle, setParkInfosInCircle] = useState<ParkInfo[]>([]);
	const { RADIUS, centerLocation, initMap, setMarker, resetMarkers, openInfoWindow } = useKakaoMap({
		onMarkerClick: (key) => setSelectedKey(key),
	});
	const { parkInfos, parkingInfos, privateParkInfos } = useParkInfo();

	useEffect(() => {
		if (!parkInfos) return;
		resetMarkers();

		const targetParkInfos = parkInfos.filter((parkInfo) => {
			const distance = calculateHaversineDistance({
				lat1: centerLocation.lat,
				lng1: centerLocation.lng,
				lat2: parkInfo.LAT,
				lng2: parkInfo.LOT,
			});
			return distance <= RADIUS;
		});
		setParkInfosInCircle(targetParkInfos);

		targetParkInfos.forEach((parkInfo) => {
			const realTimeInfo = parkingInfos?.find(
				(info) => info.PKLT_NM === parkInfo.PKLT_NM && info.ADDR === parkInfo.ADDR
			);

			const state = realTimeInfo
				? getTrafficState(realTimeInfo.NOW_PRK_VHCL_CNT, realTimeInfo.TPKCT)
				: 'normal';

			const key = getParkingKey(parkInfo);
			setMarker({
				key,
				lat: parkInfo.LAT,
				lng: parkInfo.LOT,
				state,
				markInfo: (
					<ParkingInfoDetail
						parkInfo={parkInfo}
						realTimeInfo={realTimeInfo}
					/>
				),
			});
		});
	}, [centerLocation, parkInfos, parkingInfos, RADIUS, setMarker]);

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=clusterer`}
				onLoad={() => mapRef.current && initMap(mapRef.current)}
			/>
			<SearchBar />
			{parkInfosInCircle.length > 0 && (
				<ParkingList
					parkInfosInCircle={parkInfosInCircle}
					selectedKey={selectedKey}
					openInfoWindow={openInfoWindow}
				/>
			)}
			<div
				ref={mapRef}
				className='h-full w-full'
			></div>
		</>
	);
};

export default KakaoMap;
