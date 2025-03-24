'use client';

import useKakaoMap from '@/hooks/useKakaoMap';
import Script from 'next/script';
import { useRef } from 'react';

const KakaoMap = () => {
	const mapRef = useRef<HTMLDivElement>(null);
	const { initMap } = useKakaoMap();

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
				onLoad={() => mapRef.current && initMap(mapRef.current)}
			/>
			<div
				ref={mapRef}
				className='h-full w-full'
			></div>
		</>
	);
};

export default KakaoMap;
