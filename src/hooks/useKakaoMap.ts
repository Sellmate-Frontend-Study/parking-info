'use	client';

import { MarkerType } from '@/types/marker';
import { Location } from '@/types/location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { centerLocationAtom, radiusAtom, mapAtom } from '@/store/mapAtoms';

interface SetMarkerOptions {
	lat: number;
	lng: number;
	state: MarkerType;
	clickEvent: () => void;
}

const useKakaoMap = () => {
	const [RADIUS] = useAtom(radiusAtom);
	const setMapAtom = useSetAtom(mapAtom);
	const [centerLocation, setCenterLocation] = useAtom(centerLocationAtom);
	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
	const markerClusterRef = useRef<kakao.maps.MarkerClusterer | null>(null);

	const newLatLng = ({ latitude, longitude }: Location) => {
		return new kakao.maps.LatLng(latitude, longitude);
	};

	const initMap = (mapElement: HTMLElement) => {
		kakao.maps.load(() => {
			const center = newLatLng({ latitude: centerLocation.lat, longitude: centerLocation.lng });
			const kakaoMap = new kakao.maps.Map(mapElement, {
				center,
				level: 3,
			});

			setMap(kakaoMap);
			setMapAtom(kakaoMap);

			markerClusterRef.current = new kakao.maps.MarkerClusterer({
				map: kakaoMap,
				averageCenter: true,
				minLevel: 5,
			});

			const kakaoCircle = new kakao.maps.Circle({
				center,
				radius: RADIUS,
				strokeColor: '#75B8FA',
				fillColor: '#CFE7FF',
				fillOpacity: 0.3,
			});
			kakaoCircle.setMap(kakaoMap);
			setCircle(kakaoCircle);

			kakao.maps.event.addListener(kakaoMap, 'dragend', () => {
				const newCenter = kakaoMap.getCenter();
				setCenterLocation({ lat: newCenter.getLat(), lng: newCenter.getLng() });
			});
		});
	};

	const setCirclePosition = useCallback(() => {
		if (circle) {
			const newCenter = newLatLng({
				latitude: centerLocation.lat,
				longitude: centerLocation.lng,
			});
			circle.setPosition(newCenter);
		}
	}, [circle, centerLocation]);

	const setCenterPosition = useCallback(
		(lat: number, lng: number) => {
			if (!map) return;
			const newCenter = newLatLng({ latitude: lat, longitude: lng });
			map.setCenter(newCenter);
			setCenterLocation({ lat, lng });
		},
		[map, setCenterLocation]
	);

	const setMarker = useCallback(
		({ lat, lng, state, clickEvent }: SetMarkerOptions) => {
			if (!map || !markerClusterRef.current) return;

			const markerImage = new kakao.maps.MarkerImage(
				`/marker_${state}.svg`,
				new kakao.maps.Size(30, 32.44),
				{ offset: new kakao.maps.Point(15, 32.44) }
			);

			const marker = new kakao.maps.Marker({
				position: newLatLng({ latitude: lat, longitude: lng }),
				image: markerImage,
				clickable: true,
			});

			kakao.maps.event.addListener(marker, 'click', clickEvent);

			markerClusterRef.current.addMarker(marker);
		},
		[map]
	);

	const resetMarkers = () => {
		markerClusterRef.current?.clear(); 
	};
	

	useEffect(() => {
		setCirclePosition();
	}, [centerLocation, setCirclePosition]);

	return {
		map,
		RADIUS,
		centerLocation,
		initMap,
		setMarker,
		resetMarkers,
		setCenterPosition,
	};
};

export default useKakaoMap;
