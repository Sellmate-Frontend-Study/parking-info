'use client';

import Script from 'next/script';
import { useKakaoMap } from '@/hooks/useKakaoMap';

export default function KakaoMap() {
	const { coords } = useKakaoMap();

	const setKakaoMap = () => {
		const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
		const options = {
			//지도를 생성할 때 필요한 기본 옵션
			center: new window.kakao.maps.LatLng(coords.latitude, coords.longitude), //지도의 중심좌표.
			level: 3, //지도의 레벨(확대, 축소 정도)
		};

		new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
	};

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
				strategy='afterInteractive'
				onLoad={() =>
					window.kakao.maps.load(() => {
						setKakaoMap();
					})
				}
			/>
			<div
				id='map'
				className='w-full h-screen'
			/>
		</>
	);
}
