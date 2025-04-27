import KakaoMap from '@/components/KakaoMap';
import MarkerTypeNotice from '@/components/MarkerTypeNotice';
import ParkInfoLoader from '@/components/ParkInfoLoader';
import SearchBar from '@/components/SearchBar';
import SelectRadius from '@/components/SelectRadius';

const Home = () => {
	return (
		<div className='no-wrap relative flex h-screen w-screen'>
			<aside className='w-[250px] min-w-[250px] bg-white shadow-md'>
				<div className='bg-indigo-50 px-3 py-2'>
					<SearchBar />
				</div>

				<hr className='text-gray-300' />

				<div className='flex h-[calc(100%-48px)] items-center justify-center'>
					<div className='text-gray-400'>검색어를 입력하세요.</div>
				</div>
			</aside>

			<div className='fixed top-2 right-3 z-50'>
				<SelectRadius />
			</div>

			<KakaoMap />
			<MarkerTypeNotice />
			<ParkInfoLoader />
		</div>
	);
};

export default Home;
