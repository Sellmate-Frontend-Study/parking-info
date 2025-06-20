'use client';

import { getLocalAddress } from '@/actions/localAddress';
import useInput from '@/hooks/useInput';
import useParkInfo from '@/hooks/useParkingInfo';
import { radiusAtom } from '@/states/radiusAtom';
import SearchIcon from '@assets/search.svg';
import clsx from 'clsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import Location from '@assets/location.svg';
import { ParkingInfo } from '@/types/parkingInfo';
import useKakaoMap from '@/hooks/useKakaoMap';
import { renderToHtmlElement } from '@/utils/renderComponent';
import { locationAtom } from '@/states/locationAtom';
import { infoWindowAtom } from '@/states/infoWindowAtom';
import { parkInfoDetail } from '@/components/ParkingInfoDetail';
import { kakaoMapAtom } from '@/states/kakaoMapAtom';

const SearchBar = () => {
	const radius = useAtomValue(radiusAtom);
	const { getTargetParkingInfos } = useParkInfo();
	const { value, handleChange } = useInput();
	const [result, setResult] = useState<Array<ParkingInfo>>([]);
	const setLocation = useSetAtom(locationAtom);
	const infoWindow = useAtomValue(infoWindowAtom);
	const kakaoMap = useAtomValue(kakaoMapAtom);

	const search = () => {
		getLocalAddress(value).then((data) => {
			if (data.length === 0) {
				alert('검색 결과가 없습니다.');
				return;
			}

			console.log({ latitude: parseFloat(data[0].y), longitude: parseFloat(data[0].x) });

			const targetParkInfos = getTargetParkingInfos(
				{ latitude: parseFloat(data[0].y), longitude: parseFloat(data[0].x) },
				radius
			);
			setResult(targetParkInfos);
		});
	};

	return (
		<div>
			<div className='flex h-11 w-md flex-row overflow-hidden rounded-full border-1 border-solid border-gray-100 bg-white pl-4 shadow-xl'>
				<input
					type='text'
					placeholder='지도 검색'
					className='w-full text-black focus:outline-0'
					value={value}
					onChange={handleChange}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							search();
						}
					}}
				/>
				<button
					title='search'
					type='button'
					className='group px-4'
					onClick={search}
				>
					<SearchIcon className='text-gray-500 group-hover:text-blue-600' />
				</button>
			</div>

			<ul
				className={clsx(
					'scrollbar-hide top-14 h-150 w-md list-none overflow-y-scroll rounded-md border-solid border-gray-100 bg-white text-center text-black shadow-xl',
					result.length > 0 && 'absolute',
					result.length === 0 && 'hidden'
				)}
			>
				{result.map((v, k) => (
					<li
						key={k}
						className='cursor-pointer content-center hover:bg-gray-100'
						onClick={() => {
							setLocation({
								latitude: v.latitude,
								longitude: v.longitude,
							});

							if (kakaoMap && infoWindow) {
								// infoWindow?.close();
								// const markerPosition = newLocation({ latitude, longitude });
								// const marker = new kakao.maps.Marker({
								// 	position: markerPosition,
								// 	image: markerImage,
								// 	clickable: true,
								// });
								// const iwContent = parkInfoDetail(v);
								// infoWindow!.setContent(iwContent);
								// infoWindow!.open(kakaoMap, k);
							}

							setResult([]);
						}}
					>
						<div className='flex flex-row items-center gap-4 px-4 py-3'>
							<Location className='h-[20px] w-[20px] text-gray-400' />
							<div className='flex w-full flex-row justify-between'>
								<div className='flex flex-col items-start text-start text-sm'>
									<span>{v.name}</span>
									<span>{v.addr}</span>
								</div>
							</div>
							<div className='w-22 self-center text-sm'>
								<span>{v.type}</span>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchBar;
