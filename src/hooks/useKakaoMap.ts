import { useEffect, useRef, useState } from 'react'

const useKakaoMap = () => {
 const mapEl = useRef<HTMLElement | null>(null)
 const [isKakaoLoaded, setIsKakaoLoaded] = useState(false)

 // 서울 시청 좌표
 const LATITUDE = 37.5665
 const LONGITUDE = 126.978
 useEffect(() => {
  if (!isKakaoLoaded) return; // SDK가 로드되지 않으면 실행 안 함

  kakao.maps.load(() => {
   // 실시간 정보
   // if (!navigator.geolocation) return
   // navigator.geolocation.getCurrentPosition((position) => {

   //  const { latitude, longitude } = position.coords
   // })

   if (!mapEl.current) return
   const mapOption = {
    center: new window.kakao.maps.LatLng(LATITUDE, LONGITUDE),
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