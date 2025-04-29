export interface Location {
	latitude: number;
	longitude: number;
}

export enum MarkerType {
	Normal = 'normal',
	Smooth = 'smooth',
	Congested = 'congested',
	Jammed = 'jammed',
}

export interface SetMarker extends Location {
	state: MarkerType;
	clickEvent: (marker: kakao.maps.Marker) => void;
}
