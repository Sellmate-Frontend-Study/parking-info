'use	client';

import { useCallback, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { type MarkerData } from '@/types/marker';
import { type Location } from '@/types/location';
import { locationAtom } from '@/stores/locationAtom';
import { radiusAtom } from '@/stores/radiusAtom';
import { markerInfoAtom } from '@/stores/markerInfoAtom';
import { showInfoWindowAtom } from '@/stores/showInfoWindowAtom';
import { parkInfoDetail } from '@/components/ParkInfoDetail';

export const useKakaoMap = () => {
	const [location, setLocation] = useAtom(locationAtom);
	const [radius] = useAtom(radiusAtom);
	const [, setMarkerInfo] = useAtom(markerInfoAtom);
	const [, setShowInfoWindow] = useAtom(showInfoWindowAtom);

	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
	const markerClusterRef = useRef<kakao.maps.MarkerClusterer | null>(null);
	const infoWindowRef = useRef<kakao.maps.InfoWindow | null>(null);

	const newLatLng = ({ latitude, longitude }: Location) => {
		return new kakao.maps.LatLng(latitude, longitude);
	};

	const initMap = (mapElement: HTMLElement) => {
		kakao.maps.load(() => {
			const center = newLatLng(location);
			const options = {
				center: center,
				level: 3,
			};

			// map
			const kakaoMap = new kakao.maps.Map(mapElement, options);
			setMap(kakaoMap);

			// clusterer
			markerClusterRef.current = new kakao.maps.MarkerClusterer({
				map: kakaoMap,
				averageCenter: true,
				minLevel: 5,
			});

			// infoWindow
			infoWindowRef.current = new kakao.maps.InfoWindow({ removable: true });

			// circle
			if (radius) {
				const kakaoCircle = new kakao.maps.Circle({
					center,
					radius: radius,
					strokeColor: '#75B8FA',
					fillColor: '#CFE7FF',
					fillOpacity: 0.3,
				});
				kakaoCircle.setMap(kakaoMap);
				setCircle(kakaoCircle);
			}

			// map drag event
			kakao.maps.event.addListener(kakaoMap, 'dragend', () => {
				const newCenter = kakaoMap.getCenter();
				setLocation({ latitude: newCenter.getLat(), longitude: newCenter.getLng() });
			});
		});
	};

	const setCirclePosition = useCallback(() => {
		if (!map || !circle || !radius) return;

		const center = newLatLng(location);

		circle.setPosition(center);
		circle.setRadius(radius);
		map.panTo(center);
	}, [circle, location, map, radius]);

	const setMapPosition = useCallback(() => {
		if (!map) return;

		const center = newLatLng(location);
		setLocation({ latitude: center.getLat(), longitude: center.getLng() });
	}, [location, map]);

	const setMarkersFromData = useCallback(
		(data: MarkerData[]) => {
			if (!map || !markerClusterRef.current || !infoWindowRef.current) return;

			markerClusterRef.current.clear();

			const markers: kakao.maps.Marker[] = data.map((item) => {
				const imageSrc = `/marker_${item.state}.svg`;
				const imageSize = new kakao.maps.Size(30, 32.44);
				const imageOption = { offset: new kakao.maps.Point(15, 32.44) };
				const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
				const markerPosition = newLatLng({ latitude: item.latitude, longitude: item.longitude });

				const marker = new kakao.maps.Marker({
					position: markerPosition,
					image: markerImage,
					clickable: true,
				});

				kakao.maps.event.addListener(marker, 'click', () => {
					infoWindowRef.current?.close();

					const iwContent = parkInfoDetail(item);
					infoWindowRef.current!.setContent(iwContent);
					infoWindowRef.current!.open(map, marker);
				});

				return marker;
			});

			markerClusterRef.current.addMarkers(markers);
		},
		[map]
	);

	return {
		map,
		location,
		initMap,
		setMarkersFromData,
		setCirclePosition,
		setMapPosition,
	};
};
