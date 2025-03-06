import { useEffect, useRef, useState } from 'react'

const useKakaoMap = () => {
 const mapEl = useRef<HTMLElement | null>(null)
 const [isKakaoLoaded, setIsKakaoLoaded] = useState(false)

 useEffect(() => {
  if (!isKakaoLoaded) return; // SDK가 로드되지 않으면 실행 안 함

  kakao.maps.load(() => {
   if (!mapEl.current) {
    console.error("지도를 표시할 div(#map)를 찾을 수 없음");
    return;
   }
   const mapOption = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
   };

   new window.kakao.maps.Map(mapEl.current, mapOption);
  })
 }, [isKakaoLoaded]); // SDK가 로드된 후 실행

 return {
  mapEl,
  setIsKakaoLoaded
 }
}

export default useKakaoMap