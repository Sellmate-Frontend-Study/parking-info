import SearchBar from '@/components/SearchBar';
import SelectRadius from '@/components/SelectRadius';

const Header = () => {
	return (
		<div className='absolute top-0 left-0 z-10 flex w-full items-start gap-x-3 bg-gray-100/50 py-4 pl-3 '>
			<SelectRadius />
			<SearchBar />
		</div>
	);
};

export default Header;
