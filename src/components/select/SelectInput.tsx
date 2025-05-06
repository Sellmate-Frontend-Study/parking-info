import clsx from 'clsx';
import { FaChevronDown } from 'react-icons/fa6';
import { Dispatch, RefObject, SetStateAction } from 'react';

interface SelectInputProps {
	selectId: string;
	value: string;
	isSelectOpen: boolean;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	sSelectRef: RefObject<HTMLDivElement | null>;
}
const SIZE_CLASSES = {
	sm: 'h-[32pxr] text-[14pxr]',
	md: 'h-[48pxr] text-[16pxr]',
};

const SelectInput = ({
	selectId,
	value,
	isSelectOpen,
	placeholder = '선택',
	disabled,
	className,
	setIsOpen,
	sSelectRef,
}: SelectInputProps) => {
	return (
		<div
			id={`s-portal--${selectId}`}
			className={clsx(
				'relative flex h-8 cursor-pointer flex-nowrap items-center rounded-lg border border-[#ddd] bg-white pl-3 text-[#222]',
				disabled && '!cursor-not-allowed !bg-gray-300',
				className
			)}
			ref={sSelectRef}
			onClick={() => {
				if (disabled) return;
				setIsOpen((prev) => !prev);
			}}
		>
			<div className={clsx('s-select__content--container w-auto max-w-full min-w-0 flex-auto ')}>
				<div className='s-select__content overflow-hidden text-left text-ellipsis whitespace-nowrap'>
					{!value || value === '' ? (
						<span>{placeholder}</span>
					) : (
						<span className={clsx({ 'text-gray-500': disabled })}>{value}</span>
					)}
				</div>
			</div>
			<div className='s-select__append px-2'>
				<FaChevronDown
					className={clsx(
						'text-[10px] text-gray-400 transition-transform duration-300',
						isSelectOpen && 'rotate-180'
					)}
				/>
			</div>
		</div>
	);
};

export default SelectInput;
