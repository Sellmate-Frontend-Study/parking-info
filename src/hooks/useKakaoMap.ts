'use	client';

import { MarkerData } from '@/types/marker';
import { Location } from '@/types/location';
import { useCallback, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { locationAtom } from '@/stores/locationAtom';
import { radiusAtom } from '@/stores/radiusAtom';

const useKakaoMap = () => {
	const [location, setLocation] = useAtom(locationAtom);
	const [radius] = useAtom(radiusAtom);

	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
	const markerClusterRef = useRef<kakao.maps.MarkerClusterer | null>(null);

	const newLatLng = ({ latitude, longitude }: Location) => {
		return new kakao.maps.LatLng(latitude, longitude);
	};

	const initMap = (mapElement: HTMLElement) => {
		kakao.maps.load(() => {
			const center = newLatLng({ latitude: location.latitude, longitude: location.longitude });
			const options = {
				center: center,
				level: 3,
			};

			const kakaoMap = new kakao.maps.Map(mapElement, options);
			setMap(kakaoMap);

			markerClusterRef.current = new kakao.maps.MarkerClusterer({
				map: kakaoMap,
				averageCenter: true,
				minLevel: 5,
			});

			const kakaoCircle = new kakao.maps.Circle({
				center,
				radius: radius,
				strokeColor: '#75B8FA',
				fillColor: '#CFE7FF',
				fillOpacity: 0.3,
			});
			kakaoCircle.setMap(kakaoMap);
			setCircle(kakaoCircle);

			kakao.maps.event.addListener(kakaoMap, 'dragend', () => {
				const newCenter = kakaoMap.getCenter();
				setLocation({ latitude: newCenter.getLat(), longitude: newCenter.getLng() });
			});
		});
	};

	const setCirclePosition = useCallback(() => {
		if (!map || !circle) return;

		const newCenter = newLatLng(location);
		circle.setPosition(newCenter);
		circle.setRadius(radius);
		map.panTo(newCenter);
	}, [circle, location, map, radius]);

	const setMarkersFromData = useCallback(
		(data: MarkerData[]) => {
			if (!map || !markerClusterRef.current) return;

			markerClusterRef.current.clear();

			const newMarkers: kakao.maps.Marker[] = data.map((item) => {
				const imageSrc = `/marker_${item.state}.svg`;
				const imageSize = new kakao.maps.Size(30, 32.44);
				const imageOption = { offset: new kakao.maps.Point(15, 32.44) };
				const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
				const markerPosition = newLatLng({ latitude: item.latitude, longitude: item.longitude });

				const marker = new kakao.maps.Marker({
					position: markerPosition,
					image: markerImage,
				});

				kakao.maps.event.addListener(marker, 'click', () => {
					console.log(`마커 클릭: (${item.latitude}, ${item.longitude}), 상태: ${item.state}`);
					console.log(item);
				});

				return marker;
			});

			markerClusterRef.current.addMarkers(newMarkers);
		},
		[map]
	);

	return {
		map,
		location,
		initMap,
		setMarkersFromData,
		setCirclePosition,
	};
};

export default useKakaoMap;
