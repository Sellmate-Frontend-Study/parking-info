import KakaoMap from '@/components/KakaoMap';
import MarkerTypeNotice from '@/components/MarkerTypeNotice';
import MainSearchInput from '@/components/MainSearchInput';
import { ParkInfoProvider } from '@/providers/ParkInfoProvider';
import MarkerDetail from '@/components/MarkerDetail';
import SearchListDrawer from '@/components/SearchListDrawer';

const Home = () => {
	return (
		<div className='relative h-screen w-screen'>
			<ParkInfoProvider>
				<MainSearchInput />
				<KakaoMap />
				<MarkerTypeNotice />
				{/* <MarkerDetail /> */}
				<SearchListDrawer />
			</ParkInfoProvider>
		</div>
	);
};

export default Home;
