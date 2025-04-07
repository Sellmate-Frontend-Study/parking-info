'use client';
import useKakaoMap from '@/hooks/useKakaoMap';
import { type ChangeEvent, KeyboardEvent, useState } from 'react';

const SearchBar = () => {
 const [value, setValue] = useState<string>('');
 const { searchAddress } = useKakaoMap();
 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
 };
 const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
   searchAddress((e.target as HTMLInputElement).value);
  }
 };

 return (
  <div className='absolute bottom-10 left-1/2 z-10 flex h-8 w-2/3 -translate-x-1/2 transform items-center rounded-2xl bg-white px-4 py-2'>
   <input
    className='h-full w-full outline-0'
    value={value}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
   />
  </div>
 );
};

export default SearchBar;
