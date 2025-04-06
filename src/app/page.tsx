import KakaoMap from '@/components/KakaoMap';
import MarkerTypeNotice from '@/components/MarkerTypeNotice';
import MainSearchInput from '@/components/MainSearchInput';
import { ParkInfoProvider } from '@/providers/ParkInfoProvider';
import { LocaleProvider } from '@/providers/LocaleProvider';

const Home = () => {
	return (
		<div className='relative h-screen w-screen'>
			<ParkInfoProvider>
				<LocaleProvider>
					<MainSearchInput />
					<KakaoMap />
					<MarkerTypeNotice />
				</LocaleProvider>
			</ParkInfoProvider>
		</div>
	);
};

export default Home;
