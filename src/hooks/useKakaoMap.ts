import { useEffect, useRef, useState } from 'react'

const useKakaoMap = () => {
 const mapEl = useRef<HTMLElement | null>(null)
 const [isKakaoLoaded, setIsKakaoLoaded] = useState(false)

 useEffect(() => {
  if (!isKakaoLoaded) return; // SDK가 로드되지 않으면 실행 안 함

  kakao.maps.load(() => {
   if (!navigator.geolocation) return
   navigator.geolocation.getCurrentPosition((position) => {
    if (!mapEl.current) return

    const { latitude, longitude } = position.coords
    const mapOption = {
     center: new window.kakao.maps.LatLng(latitude, longitude),
     level: 3,
    };

    new window.kakao.maps.Map(mapEl.current, mapOption);
   })
  })
 }, [isKakaoLoaded]); // SDK가 로드된 후 실행

 return {
  mapEl,
  setIsKakaoLoaded
 }
}

export default useKakaoMap