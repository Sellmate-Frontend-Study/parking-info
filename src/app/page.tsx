import FloatingHeader from '@/components/FloatingHeader';
import KakaoMap from '@/components/KakaoMap';
import MarkerTypeNotice from '@/components/MarkerTypeNotice';
import { ParkingInfoProvider } from '@/providers/ParkingInfoProvider';

const Home = () => {
	return (
		<div className='relative h-screen w-screen'>
			<ParkingInfoProvider>
				<FloatingHeader />
				<KakaoMap />
				<MarkerTypeNotice />
			</ParkingInfoProvider>
		</div>
	);
};

export default Home;
