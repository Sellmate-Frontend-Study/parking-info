'use	client';

import { MarkerType } from '@/types/marker';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { locationAtom } from '@/atoms/locationAtom';
import { radiusAtom } from '@/atoms/radiusAtom';
import { newLatLng } from '@/util/kakaoLocation';
import { MarkerDetailAtom } from '@/atoms/markerAtom';
import { renderToString } from 'react-dom/server';
import ParkInfoDetail from '@/components/ParkInfoDetail';

const useKakaoMap = () => {
	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
	const markerClusterRef = useRef<kakao.maps.MarkerClusterer | null>(null);
	const [centerLocation, setCenterLocation] = useAtom(locationAtom);
	const radius = useAtomValue(radiusAtom);
	const [markerDetail, setMarkerDetail] = useAtom(MarkerDetailAtom);

	const initMap = (mapElement: HTMLElement) => {
		kakao.maps.load(() => {
			const center = newLatLng({ latitude: centerLocation.lat, longitude: centerLocation.lng });
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
				radius,
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
			const newCenter = newLatLng({ latitude: centerLocation.lat, longitude: centerLocation.lng });
			circle.setPosition(newCenter);
		}
	}, [circle, centerLocation]);

	const markerEventListener = (targetMarker: kakao.maps.Marker, markerData: any) => {
		window.kakao.maps.event.addListener(targetMarker, 'click', function () {
			if (!map) return;
			setMarkerDetail(markerData);
			const previousOverlay = document.getElementById('overlayContainer');
			if (previousOverlay) {
				previousOverlay.remove();
			}

			const newLatlng = targetMarker.getPosition();
			const overlayContent = <ParkInfoDetail />;
			// 컴포넌트를 string으로 전환 후 HTMLElement에 삽입
			const overlayContainer = document.createElement('div');
			overlayContainer.id = 'overlayContainer';
			overlayContainer.style.position = 'absolute';
			overlayContainer.style.width = '420px';
			overlayContainer.style.height = '320px';
			overlayContainer.style.left = '-210px';
			overlayContainer.style.bottom = '30px';
			overlayContainer.innerHTML = renderToString(overlayContent);
			overlayContainer
				.querySelector('#overlayCloseBtn')
				?.addEventListener('click', () => overlayContainer.remove());

			// 커스텀 오버레이 생성
			new kakao.maps.CustomOverlay({
				map,
				clickable: true,
				position: newLatlng,
				content: overlayContainer,
				zIndex: 10000,
			});

			const imageSrc = `/marker_selected.svg`;
			const imageSize = new kakao.maps.Size(30, 32.44);
			const imageOption = { offset: new kakao.maps.Point(15, 32.44) };
			const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
			targetMarker.setImage(markerImage);
			targetMarker.setMap(map);
		});
	};

	const setMarkersFromData = useCallback(
		(data: { lat: number; lng: number; state: MarkerType; rawData?: any }[]) => {
			if (!map || !markerClusterRef.current) return;

			markerClusterRef.current.clear();

			const newMarkers: kakao.maps.Marker[] = data.map(({ lat, lng, state, rawData }) => {
				console.log(markerDetail);

				const imageSrc = `/marker_${state}.svg`;
				const imageSize = new kakao.maps.Size(30, 32.44);
				const imageOption = { offset: new kakao.maps.Point(15, 32.44) };
				const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
				const markerPosition = newLatLng({ latitude: lat, longitude: lng });

				const marker = new kakao.maps.Marker({
					position: markerPosition,
					image: markerImage,
				});

				markerEventListener(marker, rawData);

				return marker;
			});

			markerClusterRef.current.addMarkers(newMarkers);
		},
		[map]
	);

	useEffect(() => {
		setCirclePosition();
		map?.panTo(newLatLng({ latitude: centerLocation.lat, longitude: centerLocation.lng }));
	}, [centerLocation, setCirclePosition]);

	useEffect(() => {
		if (radius && circle) {
			circle.setRadius(radius);
		}
	}, [radius, circle]);

	return { map, initMap, setMarkersFromData };
};

export default useKakaoMap;
