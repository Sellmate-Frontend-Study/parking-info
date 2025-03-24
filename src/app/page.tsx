import KakaoMap from '@/components/KakaoMap';
import { ParkInfoProvider } from '@/providers/ParkInfoProvider';

const Home = () => {
	return (
		<div className='h-screen w-screen'>
			<ParkInfoProvider>
				<KakaoMap />
			</ParkInfoProvider>
		</div>
	);
};

export default Home;
