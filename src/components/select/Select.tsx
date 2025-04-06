import { useEffect, useRef, useState } from 'react';
import { SelectOptionProps } from './SelectOptions';
import SelectDropdownContainer from './SelectDropdownContainer';
import SelectItems from './SelectItems';

export interface SelectProps {
	defaultValue?: SelectOptionProps[];
	options: SelectOptionProps[];
	classname?: string;
	placeholder?: string;
	disabled?: boolean;
	useMultiple?: boolean;
	useCheck?: boolean;
	handleChange?: (item: SelectOptionProps[]) => void;
}

const SSelect = ({
	defaultValue,
	options,
	classname,
	placeholder = '선택',
	disabled = false,
	useMultiple = false,
	handleChange,
}: SelectProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [value, setValue] = useState<SelectOptionProps[]>(defaultValue || []);
	const selectRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (handleChange) handleChange(value);
	}, [value, handleChange]);

	return (
		<>
			<button
				ref={selectRef}
				className={[
					`s-select disabled:border-Grey_Lighten-2 disabled:bg-Grey_Lighten-4 relative inline-block cursor-pointer overflow-hidden 
					rounded-[4px] border border-[#AAAAAA] py-[4px] pr-[20px] pl-[12px] text-start text-[14px] text-ellipsis 
					whitespace-nowrap hover:bg-[#F6F6F6] disabled:cursor-not-allowed disabled:text-[#888888]`,
					classname,
				].join(' ')}
				onClick={() => setIsDropdownOpen((previousStatus) => !previousStatus)}
				disabled={disabled}
			>
				{!value.length
					? placeholder
					: value.length === options.filter((option) => !option.disabled).length
						? '전체'
						: value.map((item) => item.value).join(', ')}
				<img
					src='/dropdownIcon.svg'
					className={`absolute top-2 right-2 ${isDropdownOpen && 'rotate-180'}`}
					style={{ transition: 'transform 0.3s' }}
				/>
			</button>

			<SelectDropdownContainer
				parentRef={selectRef}
				isOpen={isDropdownOpen}
				setIsOpen={setIsDropdownOpen}
			>
				<SelectItems
					options={options}
					useMultiple={useMultiple}
					value={value}
					setValue={setValue}
					setIsDropdownOpen={setIsDropdownOpen}
				/>
			</SelectDropdownContainer>
		</>
	);
};

export default SSelect;
