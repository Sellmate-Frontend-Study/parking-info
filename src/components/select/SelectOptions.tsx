import {
	Dispatch,
	RefObject,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react';
// import SCheckbox from '../SCheckbox';

const initParentDOMRect = {
	height: 0,
	width: 0,
	x: 0,
	y: 0,
	bottom: 0,
	left: 0,
	top: 0,
};

export interface SelectOptionProps {
	label: string;
	value: number | string;
	disabled?: boolean;
}

export interface SelectOptionsProps {
	isOpen: boolean;
	parentRef: RefObject<HTMLButtonElement>;
	options: SelectOptionProps[];
	useMultiple: boolean;
	useCheck: boolean;
	value: SelectOptionProps[];
	setValue: Dispatch<SetStateAction<SelectOptionProps[]>>;
	setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

const SelectOptions = ({
	isOpen,
	parentRef,
	options = [],
	useMultiple,
	useCheck,
	value,
	setValue,
	setIsDropdownOpen,
}: SelectOptionsProps) => {
	const selectDropdownRef = useRef<HTMLUListElement>(null);

	function handleClick(arg: SelectOptionProps) {
		if (useMultiple) {
			const isExist = value.includes(arg);

			if (isExist) {
				setValue((prev) => prev.filter((item) => item !== arg));
			} else {
				setValue((prev) => [...prev, arg]);
			}
		} else {
			setValue([arg]);
			setIsDropdownOpen(false);
		}
	}

	const handleClickOutSide = useCallback(
		(e: MouseEvent) => {
			if (
				parentRef.current &&
				!parentRef.current.contains(e.target as Node) &&
				selectDropdownRef.current &&
				!selectDropdownRef.current.contains(e.target as Node)
			)
				setIsDropdownOpen(false);
		},
		[parentRef, setIsDropdownOpen]
	);

	function toggleTotal() {
		if (value.length === 0) setValue(options);
		else setValue([]);
	}

	const position = useMemo(
		() => (parentRef.current ? parentRef.current.getBoundingClientRect() : initParentDOMRect),
		[parentRef]
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutSide);

		return () => {
			document.removeEventListener('mousedown', handleClickOutSide);
		};
	}, [handleClickOutSide]);

	return (
		<ul
			ref={selectDropdownRef}
			className={[
				's-select__options shadow-dropdownOptions rounded-[2px]  bg-white',
				isOpen ? 'opacity-1' : 'opacity-0',
			].join(' ')}
			style={{
				position: 'absolute',
				top: position.top + position.height + 4 + window.scrollY,
				left: position.left + window.scrollX,
				width: position.width,
				transition: 'opacity 0.4s',
			}}
		>
			{/* {useCheck && (
				<li
					className={[
						'group/select-dropdown-item flex w-full items-center gap-8pxr px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white',
					].join(' ')}
					onMouseDown={toggleTotal}
				>
					<SCheckbox
						className={`${value.length === options.length && 'group-hover/select-dropdown-item:before:border-white'}`}
						checked={
							!value.length ? false : value.length === options.length ? true : null
						}
						useIndependently
					/>
					<div>전체</div>
				</li>
			)} */}
			{options.map((option) => (
				<li
					key={option.value}
					className={[
						'group/select-dropdown-item hover:bg-Blue_C_Default aria-disabled:text-Grey_Lighten-1 flex w-full items-center gap-2 px-3 py-1 hover:text-white aria-disabled:pointer-events-none aria-disabled:bg-white',
						value.includes(option) && !useCheck ? 'text-Blue_C_Default font-bold' : 'text-Grey_Darken-4',
					].join(' ')}
					onMouseDown={() => handleClick(option)}
					aria-disabled={option.disabled}
				>
					{/* {useCheck && (
						<SCheckbox
							className={`pointer-events-none ${value.includes(option) && 'group-hover/select-dropdown-item:before:border-white'}`}
							checked={value.includes(option)}
							useIndependently
						/>
					)} */}
					{typeof option.label === 'string' ? (
						<div>{option.label}</div>
					) : (
						<div dangerouslySetInnerHTML={{ __html: option.label }}></div>
					)}
				</li>
			))}
		</ul>
	);
};
export default SelectOptions;
