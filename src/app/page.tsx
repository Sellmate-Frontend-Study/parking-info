import KakaoMap from '@/components/KakaoMap';
import MarkerTypeNotice from '@/components/MarkerTypeNotice';
import SearchBar from '@/components/SearchBar';
import { LatLngProvider } from '@/providers/LatLngProvider';
import { ParkInfoProvider } from '@/providers/ParkInfoProvider';

const Home = () => {
	return (
		<div className='relative h-screen w-screen'>
			<ParkInfoProvider>
				<LatLngProvider>
					<KakaoMap />
					<MarkerTypeNotice />
					<SearchBar />
				</LatLngProvider>
			</ParkInfoProvider>
		</div>
	);
};

export default Home;
