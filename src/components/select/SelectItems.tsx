import { Dispatch, SetStateAction } from 'react';
// import SCheckbox from '../SCheckbox';

export interface SelectOptionProps {
	label: string;
	value: number | string;
	disabled?: boolean;
}

export interface SelectItemsProps {
	options: SelectOptionProps[];
	useMultiple: boolean;
	value: SelectOptionProps[];
	setValue: Dispatch<SetStateAction<SelectOptionProps[]>>;
	setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

const SelectItems = ({
	options = [],
	useMultiple,
	value,
	setValue,
	setIsDropdownOpen,
}: SelectItemsProps) => {
	function handleClick(arg: SelectOptionProps) {
		if (!useMultiple) {
			setValue([arg]);
			setIsDropdownOpen(false);
		} else if (value.includes(arg)) setValue((prev) => prev.filter((item) => item !== arg));
		else setValue((prev) => [...prev, arg]);
	}

	function toggleTotal() {
		if (value.length === 0) setValue(options.filter((option) => !option.disabled));
		else setValue([]);
	}

	return (
		<>
			{/* {useMultiple && (
				<li
					className={[
						'group/select-dropdown-item flex w-full items-center gap-8pxr px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white',
					].join(' ')}
				>
					<SCheckbox
						label='전체'
						labelClass='w-full'
						onChange={toggleTotal}
						className={`${value.length === options.length && 'group-hover/select-dropdown-item:before:border-white'}`}
						checked={
							!value.length
								? false
								: value.length === options.filter((option) => !option.disabled).length
									? true
									: null
						}
					/>
				</li>
			)} */}
			{options.map((option) => (
				<li
					key={option.value}
					className={[
						'group/select-dropdown-item hover:bg-Blue_C_Default aria-disabled:text-Grey_Lighten-1 flex w-full items-center gap-2 bg-white px-3 py-1 hover:text-white aria-disabled:pointer-events-none aria-disabled:bg-white',
						value.includes(option) ? 'text-Blue_C_Default font-bold' : 'text-Grey_Darken-4',
					].join(' ')}
					onMouseDown={() => handleClick(option)}
					aria-disabled={option.disabled}
				>
					{typeof option.label === 'string' ? (
						<div>{option.label}</div>
					) : (
						<div dangerouslySetInnerHTML={{ __html: option.label }}></div>
					)}
				</li>
			))}
		</>
	);
};
export default SelectItems;
