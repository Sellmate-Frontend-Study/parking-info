import FloatingHeader from '@/components/FloatingHeader';
import KakaoMap from '@/components/KakaoMap';
import MarkerTypeNotice from '@/components/MarkerTypeNotice';
import { ParkInfoProvider } from '@/providers/ParkInfoProvider';

const Home = () => {
	return (
		<div className='relative h-screen w-screen'>
			<ParkInfoProvider>
				<FloatingHeader />
				<KakaoMap />
				<MarkerTypeNotice />
			</ParkInfoProvider>
		</div>
	);
};

export default Home;
