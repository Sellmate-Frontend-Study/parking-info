import { useState, useEffect } from 'react';

export const useMapMarkers = (map: any, targetParkInfo: any) => {
	const [markers, setMarkers] = useState<any>([]);

	const markerEventListener = (targetMarker: any) => {
		window.kakao.maps.event.addListener(targetMarker, 'click', function () {
			// openModal();
			console.log('modal open!');
		});
	};

	useEffect(() => {
		if (markers.length) {
			markers.forEach((marker: any) => marker.setMap(null));
		}

		const newMarkers = (targetParkInfo as any[]).reduce<any[]>((acc, item) => {
			const { LAT, LOT, PKLT_NM } = item;

			if (LAT && LOT) {
				const markerPosition = new window.kakao.maps.LatLng(LAT, LOT);
				const marker = new window.kakao.maps.Marker({
					position: markerPosition,
					title: PKLT_NM,
					clickable: true,
				});

				marker.setMap(map); // 원 안에 있는 경우 지도에 추가
				markerEventListener(marker);
				return [...acc, marker];
			}
			return acc;
		}, []);

		setMarkers(newMarkers || []);
	}, [targetParkInfo]);

	return { markers };
};

export const setMarkers = (() => {
	let markers: any[] = [];

	return (map: any, targetParkInfo: any) => {
		markers.forEach((marker) => marker.setMap(null));

		markers = (targetParkInfo as any[]).reduce<any[]>((acc, item) => {
			const { LAT, LOT, PKLT_NM } = item;
			if (LAT && LOT) {
				const markerPosition = new window.kakao.maps.LatLng(LAT, LOT);
				const marker = new window.kakao.maps.Marker({
					position: markerPosition,
					title: PKLT_NM,
					clickable: true,
				});

				marker.setMap(map); // 지도에 추가
				window.kakao.maps.event.addListener(marker, 'click', function () {
					console.log('modal open!');
				});

				acc.push(marker);
			}
			return acc;
		}, []);
	};
})();
