"use client";

import Script from "next/script";

declare global {
  interface Window {
    // eslint-disable-next-line
    kakao: any;
  }
}

export default function KakaoMap() {
  const initMap = () => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };
      console.log("start");

      new window.kakao.maps.Map(container, options);
    }
  };

  return (
    <div className="">
      <div id="map" style={{ height: "calc(100vh - 48px)" }} />
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=e904c4222be891bf9a59a7d1b1bb9e68&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Kakao Map Loaded");
          window.kakao.maps.load(() => {
            initMap();
          });
        }}
      />
    </div>
  );
}
