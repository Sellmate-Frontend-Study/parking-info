import Header from '@/components/Header';
import KakaoMap from '@/components/KakaoMap';
import MarkerTypeNotice from '@/components/MarkerTypeNotice';
import ParkInfoDetail from '@/components/ParkInfoDetail';
import ParkInfoLoader from '@/components/ParkInfoLoader';

const Home = () => {
	return (
		<div className='relative h-screen w-screen'>
			<KakaoMap />
			<Header />
			<MarkerTypeNotice />
			<ParkInfoDetail />
			<ParkInfoLoader />
		</div>
	);
};

export default Home;
