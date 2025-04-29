'use client';

import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useParkInfoData } from '@/hooks/useParkInfoData';
import { locationAtom } from '@/stores/locationAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { FaAngleLeft, FaLocationDot } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';

const SearchCard = () => {
	const [, setLocation] = useAtom(locationAtom);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');
	const [isSearched, setIsSearched] = useState<boolean>(false);

	const { getParkInfoData } = useParkInfoData();
	const { setMarkersFromData } = useKakaoMap();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!searchValue) {
			alert('검색어를 입력하세요.');
			return;
		}

		const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(searchValue)}`;
		const response = await fetch(apiUrl, {
			headers: {
				Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
			},
		});
		const data = await response.json();
		const { documents } = data;
		if (documents.length === 0) {
			alert('검색 결과가 없습니다.');
			return;
		}
		const { x, y } = documents[0];
		const latitude = parseFloat(y);
		const longitude = parseFloat(x);
		setLocation({ latitude, longitude });

		setMarkersFromData(getParkInfoData());
		setIsSearched(true);
	};

	return (
		<>
			{isOpen ? (
				<aside
					className={`relative w-[260px] min-w-[260px] bg-white shadow-md transition-transform duration-800 ${
						isOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<div className='bg-indigo-50 px-3 py-2'>
						<form
							className='relative rounded-full shadow-md'
							onSubmit={handleSubmit}
						>
							<div className='flex w-full flex-nowrap items-center rounded-full bg-indigo-600 py-1 pr-2 pl-4'>
								<input
									placeholder='Search Map'
									title='Search input'
									type='text'
									className='w-full text-white placeholder:text-slate-200 focus:outline-none'
									onChange={(e) => setSearchValue(e.target.value)}
									autoFocus
								/>

								<button
									title='search'
									type='submit'
									className='cursor-pointer'
								>
									<IoSearch className='text-[20px] text-white' />
								</button>
							</div>
						</form>
					</div>

					<hr className='text-gray-300' />
					{!isSearched ? (
						<div className='flex h-[calc(100%-48px)] items-center justify-center'>
							<div className='text-gray-400'>검색어를 입력하세요.</div>
						</div>
					) : !getParkInfoData().length ? (
						<div className='flex h-[calc(100%-48px)] items-center justify-center'>
							<div className='text-gray-400'>검색 결과가 없습니다.</div>
						</div>
					) : (
						<div className='h-[calc(100%-48px)] overflow-y-scroll py-2'>
							{getParkInfoData().map((item, itemIdx) => (
								<div
									key={itemIdx}
									className={`px-4 py-3 text-[14px] hover:bg-gray-50 ${itemIdx !== 0 ? 'border-t border-gray-100' : ''}`}
								>
									<b className='cursor-pointer text-indigo-800'>{item.parkInfo.PKLT_NM}</b>
									<div className='text-[12px] text-gray-500'>{item.parkInfo.PKLT_KND_NM}</div>
									<div className='flex flex-nowrap items-start gap-1 pt-1'>
										<div className='flex h-[20px] items-center justify-center'>
											<FaLocationDot className='text-[12px] text-gray-400' />
										</div>
										<span className='text-[13px] leading-[20px]'>{item.parkInfo.ADDR}</span>
									</div>
								</div>
							))}
						</div>
					)}

					<button
						title='close-button'
						type='button'
						className='absolute top-1/2 -right-6 z-50 flex h-10 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-xl border border-l-0 border-gray-400 bg-white text-gray-500'
						onClick={() => setIsOpen(false)}
					>
						<FaAngleLeft className='mr-1' />
					</button>
				</aside>
			) : (
				<button
					title='search'
					type='submit'
					className='absolute top-2 left-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-indigo-600 shadow-md transition-all hover:bg-indigo-500'
					onClick={() => setIsOpen(true)}
				>
					<IoSearch className='text-[20px] text-white' />
				</button>
			)}
		</>
	);
};

export default SearchCard;
