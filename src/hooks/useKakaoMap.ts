import { ParkInfo } from '@/types/parkInfo';
import { useEffect, useState } from 'react';

const useKakaoMap = (radius = 250) => {
 const [centerLocation, setCenterLocation] = useState({ lat: 37.5665, lng: 126.978 });
 const [map, setMap] = useState<kakao.maps.Map | null>(null);
 const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
 const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
 const currentKakaoLatLng = () => {
  return new kakao.maps.LatLng(centerLocation.lat, centerLocation.lng);
 }

 const initMap = (mapElement: HTMLElement) => {
  kakao.maps.load(() => {
   const center = currentKakaoLatLng();
   const options = {
    center: center,
    level: 3,
   };

   const map = new kakao.maps.Map(mapElement, options);
   setMap(map);

   const circle = new kakao.maps.Circle({
    center: center,
    radius,
    strokeColor: '#75B8FA',
    fillColor: '#CFE7FF',
    fillOpacity: 0.3,
   });
   circle.setMap(map);
   setCircle(circle);

   kakao.maps.event.addListener(map, 'dragend', () => {
    const position = map.getCenter();
    setCenterLocation({ lat: position.getLat(), lng: position.getLng() });
   });
  });
 };


 const setCirclePosition = () => {
  if (circle) {
   const moveLocation = currentKakaoLatLng();
   circle.setPosition(moveLocation);
  }
 };

 const createMarker = (positions: ParkInfo[]) => {
  // 기존 마커 제거
  markers.forEach(marker => marker.setMap(null));

  const newMarkers = positions.map(posi => {
   const position = new kakao.maps.LatLng(posi.LAT, posi.LOT);
   const markerObj = new kakao.maps.Marker({ position });
   markerObj.setMap(map);
   return markerObj;
  });

  setMarkers(newMarkers);
 };

 useEffect(() => {
  setCirclePosition();
 }, [centerLocation]);


 return { map, centerLocation, initMap, createMarker };
};

export default useKakaoMap;
