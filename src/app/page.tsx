
import KakaoMap from '@/components/KakaoMap';
import MarkerTypeNotice from '@/components/MarkerTypeNotice';
import ParkInfoLoader from '@/components/ParkInfoLoader';
import SearchBar from '@/components/SearchBar';
import SelectRadius from '@/components/SelectRadius';

const Home = () => {
	return (
		<div className='relative h-screen w-screen'>
			<KakaoMap />
			<MarkerTypeNotice />
			<SelectRadius />
			<SearchBar />
			<ParkInfoLoader />

		</div>
	);
};

export default Home;
