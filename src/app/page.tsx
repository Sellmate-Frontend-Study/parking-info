import KakaoMap from '@/components/KakaoMap';
import MarkerTypeNotice from '@/components/MarkerTypeNotice';
import ParkInfoLoader from '@/components/ParkInfoLoader';
import SearchCard from '@/components/SearchCard';
import SelectRadius from '@/components/SelectRadius';

const Home = () => {
	return (
		<div className='no-wrap relative relative flex h-screen w-screen'>
			<SearchCard />

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
