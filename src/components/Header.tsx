import SearchBar from '@/components/SearchBar';
import SelectRadius from '@/components/SelectRadius';
import { IoSearch } from 'react-icons/io5';

const Header = () => {
	return (
		<div className='no-wrap absolute top-0 left-0 z-10 flex w-full items-center justify-between gap-x-3 px-3 py-4'>
			<div>
				<button
					title='search'
					type='submit'
					className='flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-indigo-600 shadow-md transition-all hover:bg-indigo-500'
				>
					<IoSearch className='text-[20px] text-white' />
				</button>
			</div>

			<SearchBar />
			<SelectRadius />
		</div>
	);
};

export default Header;
