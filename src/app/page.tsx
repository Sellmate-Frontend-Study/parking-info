'use client';

import KakaoMap from '@/components/KakaoMap';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import useParkInfoData from '@/hooks/useParkInfoList';
import useParkingInfoData from '@/hooks/useParkingInfoList';

export default function Home() {
	const { coords } = useKakaoMap();

	const { allParkInfoData } = useParkInfoData();
	const { allParkingInfoData } = useParkingInfoData();

	console.log('allParkInfoData : ', allParkInfoData);
	console.log('allParkingInfoData : ', allParkingInfoData);

	return (
		<main>
			<KakaoMap />
			{/* <div className='absolute top-0 left-0 p-4 right-0 bottom-0 z-10'>
				<p>
				위도: {coords.latitude}, 경도: {coords.longitude}
			</p>
			</div>
			<div>aaaa</div> */}
		</main>
	);
}
