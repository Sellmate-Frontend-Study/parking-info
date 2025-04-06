import { Dispatch, SetStateAction } from 'react';
import SCheckbox from '../SCheckbox';

export interface SelectOptionProps {
	label: string;
	value: number | string;
	disabled?: boolean;
}

export interface SelectCheckboxItemsProps {
	options: SelectOptionProps[];
	value: SelectOptionProps[];
	setValue: Dispatch<SetStateAction<SelectOptionProps[]>>;
}

const SelectCheckboxItems = ({
	options = [],
	value,
	setValue,
}: SelectCheckboxItemsProps) => {
	function handleClick(arg: SelectOptionProps) {
		const isExist = value.includes(arg);

		if (isExist) setValue((prev) => prev.filter((item) => item !== arg));
		else setValue((prev) => [...prev, arg]);
	}

	function toggleTotal() {
		if (value.length === 0)
			setValue(options.filter((option) => !option.disabled));
		else setValue([]);
	}

	return (
		<>
			<li
				className={[
					'group/select-dropdown-item flex w-full items-center gap-8pxr px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white',
				].join(' ')}
			>
				<SCheckbox
					className={`${value.length === options.length && 'group-hover/select-dropdown-item:before:border-white'}`}
					label='전체'
					labelClass='w-full'
					checked={
						!value.length
							? false
							: value.length === options.filter((option) => !option.disabled).length
								? true
								: null
					}
					onChange={toggleTotal}
				/>
			</li>
			{options.map((option) => (
				<li
					key={option.value}
					className={[
						'group/select-dropdown-item flex w-full items-center gap-8pxr px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white aria-disabled:pointer-events-none aria-disabled:bg-white aria-disabled:text-Grey_Lighten-1',
					].join(' ')}
					aria-disabled={option.disabled}
				>
					<SCheckbox
						className={`${value.includes(option) && 'group-hover/select-dropdown-item:before:border-white'}`}
						checked={value.includes(option)}
						label={option.label}
						labelClass='w-full'
						name={option.label}
						onChange={() => handleClick(option)}
					/>
				</li>
			))}
		</>
	);
};
export default SelectCheckboxItems;
