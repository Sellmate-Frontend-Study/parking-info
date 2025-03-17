'use client';

import Script from 'next/script';
import { useRef, useState } from 'react';
import { getParkingInfo } from '../actions/getParkingInfo';

declare global {
  interface Window {
    kakao: any;
  }
}
const MY_LAT = 37.5665;
const MY_LNG = 126.978;
const DEFAULT_RADIUS = 250;

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [centerPosition, setCenterPosition] = useState({
    lat: MY_LAT,
    lng: MY_LNG
  });
  const [radius, setRadius] = useState(DEFAULT_RADIUS);

  const fetchParkingInfo = async () => {
    try {
      const res = await getParkingInfo(
        centerPosition.lat,
        centerPosition.lng,
        radius
      );
      console.log(res);
    } catch (error) {
      console.error('fetchParkingInfo Error', error);
    }
  };

  const initializeMap = () => {
    if (mapRef.current && window.kakao) {
      window.kakao.maps.load(() => {  
        const position = new window.kakao.maps.LatLng(centerPosition.lat, centerPosition.lng);
        
        const options = {
          center: position,
          level: 3
        };
        
        const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
        const marker = new window.kakao.maps.Marker({
          position: position,
          content: `<div style="background-color: red; width: 12px; height: 12px; border-radius: 50%;"></div>`,
        });
        
        const circle = new window.kakao.maps.Circle({
          center: position,
          radius: radius,
          strokeColor: '#75B8FA',
          fillColor: '#CFE7FF',
          fillOpacity: 0.3
        });
        marker.setMap(kakaoMap);
        circle.setMap(kakaoMap);
        
        fetchParkingInfo();
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        onLoad={initializeMap}
      />      
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default KakaoMap;