import KakaoMap from '@/components/KakaoMap';
import MarkerTypeNotice from '@/components/MarkerTypeNotice';
import SelectRadius from '@/components/SelectRadius';
import { ParkInfoProvider } from '@/providers/ParkInfoProvider';

const Home = () => {
	return (
		<div className='relative h-screen w-screen'>
			<ParkInfoProvider>
				<KakaoMap />
				<MarkerTypeNotice />
				<SelectRadius />
			</ParkInfoProvider>
		</div>
	);
};

export default Home;
