import React, {
	Dispatch,
	RefObject,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

const initParentDOMRect = {
	width: 0,
	left: 0,
	top: 0,
};

type Props = {
	parentRef: RefObject<HTMLButtonElement | null>;
	children: React.ReactNode;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SelectDropdownContainer({ parentRef, children, isOpen, setIsOpen }: Props) {
	const [position, setPosition] = useState(initParentDOMRect);
	const selectDropdownRef = useRef<HTMLUListElement>(null);

	const handleClickOutSide = useCallback(
		(e: MouseEvent) => {
			if (
				parentRef.current &&
				!parentRef.current.contains(e.target as Node) &&
				selectDropdownRef.current &&
				!selectDropdownRef.current.contains(e.target as Node)
			)
				setIsOpen(false);
		},
		[parentRef, setIsOpen]
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutSide);

		return () => {
			document.removeEventListener('mousedown', handleClickOutSide);
		};
	}, [handleClickOutSide]);

	useEffect(() => {
		if (selectDropdownRef.current && parentRef.current) {
			const parentRect = parentRef.current.getBoundingClientRect();
			const dropdownHeight = selectDropdownRef.current.offsetHeight;
			const viewportHeight = window.innerHeight;
			const margin = 4;

			const top =
				parentRect.bottom + dropdownHeight > viewportHeight
					? parentRect.top - (dropdownHeight + margin)
					: parentRect.bottom + margin;

			setPosition({
				top: top,
				width: parentRect.width,
				left: parentRect.left,
			});
		}
	}, [parentRef]);

	return (
		<>
			{createPortal(
				<ul
					ref={selectDropdownRef}
					className={[
						's-select__options shadow-dropdownOptions rounded-[2px]  bg-white',
						isOpen ? 'opacity-1' : 'pointer-events-none opacity-0',
					].join(' ')}
					style={{
						position: 'absolute',
						top: position.top,
						left: position.left,
						width: position.width,
					}}
				>
					{children}
				</ul>,
				document.body
			)}
		</>
	);
}
