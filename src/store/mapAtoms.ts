import { atom } from 'jotai';

export const radiusAtom = atom(250);
export const centerLocationAtom = atom({ lat: 37.5665, lng: 126.978 });
export const mapAtom = atom<kakao.maps.Map | null>(null);

export const setCenterPositionAtom = atom(
	null,
	(get, set, { lat, lng }: { lat: number; lng: number }) => {
		set(centerLocationAtom, { lat, lng });
		const map = get(mapAtom);
		if (map) {
			const newCenter = new kakao.maps.LatLng(lat, lng);
			map.setCenter(newCenter);
		}
	}
);
