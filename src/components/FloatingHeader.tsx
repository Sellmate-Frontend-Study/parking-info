import SearchBar from './SearchBar';
import SelectRadius from './SelectRadius';

const FloatingHeader = () => {
	return (
		<div className='absolute top-5 left-10 z-20 flex flex-row gap-5'>
			<SearchBar />
			<SelectRadius />
		</div>
	);
};

export default FloatingHeader;
