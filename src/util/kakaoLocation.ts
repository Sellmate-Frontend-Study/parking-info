import { Location } from '@/types/location';

export const newLatLng = ({ latitude, longitude }: Location) => {
	return new kakao.maps.LatLng(latitude, longitude);
};
