'use client';

import Script from 'next/script';
import { useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const initializeMap = () => {
    if (mapRef.current && window.kakao) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3
        };
        new window.kakao.maps.Map(mapRef.current, options);
      });
    }
  };

  return (
    <>
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
    </>
  );
};

export default KakaoMap;
