import { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

interface SelectOptionProps {
	option: any;
	selected: boolean;
	onClick: (option: any) => void;
	disabled?: boolean;
	classname?: string;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SelectOptionItem = ({
	option,
	selected,
	onClick,
	disabled,
	setIsOpen,
	classname,
}: SelectOptionProps) => {
	return (
		<div
			className={clsx(
				'select-option-item gap-18pxr flex w-full cursor-pointer items-center rounded-sm bg-white px-3 py-1 text-gray-900 hover:bg-indigo-50',
				selected && 'font-bold !text-indigo-600',
				disabled && 'pointer-events-none bg-white text-gray-400',
				classname
			)}
			onClick={() => {
				setIsOpen(false);
				onClick(option);
			}}
		>
			{typeof option.label === 'string' ? (
				<div className={'whitespace-nowrap'}>{option.label}</div>
			) : (
				<div dangerouslySetInnerHTML={{ __html: option.label }}></div>
			)}
		</div>
	);
};
export default SelectOptionItem;
