'use client';

import useKakaoMap from '@/hooks/useKakaoMap';
import { useParkInfo } from '@/providers/ParkInfoProvider';
import { calculateHaversineDistance } from '@/utils/calculateHaversinceDistance';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { radiusAtom } from '@/states/radiusAtom';
import { locationAtom } from '@/states/locationAtom';
import { MarkerType } from '@/types/map';
import ParkInfoDetail from './ParkInfoDetail';
import { renderToHtmlElement } from '@/utils/renderComponent';

const getTrafficState = (available: number, total: number): MarkerType => {
	if (total === 1) return MarkerType.Normal;
	const ratio = available / total;
	if (available >= total) return MarkerType.Jammed;
	if (ratio > 0.7) return MarkerType.Congested;
	if (ratio > 0) return MarkerType.Smooth;
	return MarkerType.Normal;
};

const KakaoMap = () => {
	const mapElementRef = useRef<HTMLDivElement>(null);
	const radius = useAtomValue(radiusAtom);
	const location = useAtomValue(locationAtom);
	const { initMap, clearMarkers, setMarker, showCustomOverlay, hideCustomOverlay } = useKakaoMap();
	const { parkInfos, parkingInfos } = useParkInfo();

	useEffect(() => {
		if (!parkInfos) return;

		const targetParkInfos = parkInfos.filter((parkInfo) => {
			const distance = calculateHaversineDistance({
				lat1: location.latitude,
				lng1: location.longitude,
				lat2: parkInfo.LAT,
				lng2: parkInfo.LOT,
			});
			return distance <= radius;
		});

		clearMarkers();

		targetParkInfos.forEach((parkInfo) => {
			const realTimeInfo = parkingInfos?.find(
				(info) => info.PKLT_NM === parkInfo.PKLT_NM && info.ADDR === parkInfo.ADDR
			);

			const state: MarkerType = realTimeInfo
				? getTrafficState(realTimeInfo.NOW_PRK_VHCL_CNT, realTimeInfo.TPKCT)
				: MarkerType.Normal;

			setMarker({
				latitude: parkInfo.LAT,
				longitude: parkInfo.LOT,
				state: state,
				clickEvent: (marker: kakao.maps.Marker) => {
					const content = renderToHtmlElement(
						<ParkInfoDetail
							parkInfo={{ info: parkInfo, realTimeInfo: realTimeInfo }}
							onClose={hideCustomOverlay}
						/>
					);

					showCustomOverlay(content, marker);
				},
			});
		});
	}, [location, parkInfos, parkingInfos, radius]);

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=clusterer`}
				onLoad={() => mapElementRef.current && initMap(mapElementRef.current)}
			/>
			<div
				ref={mapElementRef}
				className='h-full w-full'
			></div>
		</>
	);
};

export default KakaoMap;
