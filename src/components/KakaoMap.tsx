"use client"

import useKakaoMap from '@/hooks/useKakaoMap';
import Script from 'next/script';

const KakaoMap = () => {
 const { mapEl, setIsKakaoLoaded } = useKakaoMap();

 return (<>
  <Script
   src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&libraries=services&autoload=false`}
   strategy="afterInteractive"
   onLoad={() => {
    setIsKakaoLoaded(true);
   }}
  />
  <main ref={mapEl} className='h-screen'></main>
 </>)

}
export default KakaoMap