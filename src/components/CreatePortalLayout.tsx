'use client';

import clsx from 'clsx';
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
	top: 0,
};

type Props = {
	children: React.ReactNode;
	parentRef: RefObject<HTMLDivElement | null>;
	clientRect: DOMRect;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	margin?: number | string;
	zIndex?: number;
	parentId: string;
	className?: string;
};

const CreatePortalLayout = ({
	children,
	parentRef,
	clientRect,
	isOpen,
	setIsOpen,
	margin = 4,
	zIndex = 100,
	parentId,
	className,
}: Props) => {
	const [position, setPosition] = useState<{
		top: number;
		left?: number;
		right?: number;
		width: number | string;
	}>(clientRect);
	const portalRef = useRef<HTMLDivElement>(null);

	const handleClickOutSide = useCallback(
		(e: MouseEvent) => {
			if (
				parentRef.current &&
				!parentRef.current.contains(e.target as Node) &&
				portalRef.current &&
				!portalRef.current.contains(e.target as Node)
			)
				setIsOpen(false);
		},
		[parentRef, setIsOpen]
	);

	function detectPosition() {
		if (typeof window !== 'undefined') {
			const parent = document.getElementById(`s-portal--${parentId}`) || null;
			const viewportHeight = window.innerHeight;
			const viewportWidth = window.innerWidth;

			if (parent && portalRef?.current) {
				const { bottom, top, left, width } = parent.getBoundingClientRect();
				const computedTop =
					bottom + portalRef.current.offsetHeight > viewportHeight
						? top - (portalRef.current.offsetHeight + Number(margin)) + window.scrollY
						: bottom + Number(margin) + window.scrollY;

				const computedLeft =
					left +
					window.scrollX +
					(left + portalRef.current.offsetWidth > viewportWidth
						? width - portalRef.current.offsetWidth
						: 0);

				setPosition({
					top: computedTop,
					width: width,
					left: computedLeft,
				});
			}
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutSide);

		return () => {
			document.removeEventListener('mousedown', handleClickOutSide);
		};
	}, [handleClickOutSide]);

	useEffect(() => {
		detectPosition();
	}, [parentId, isOpen]);

	useEffect(() => {
		if (!parentRef.current) return;

		const observer = new MutationObserver(detectPosition);
		observer.observe(document.body, { childList: true, subtree: true });

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', detectPosition);
			window.addEventListener('scroll', detectPosition);
		}
		return () => {
			window.removeEventListener('resize', detectPosition);
			window.removeEventListener('scroll', detectPosition);
		};
	}, []);

	return (
		<>
			{isOpen &&
				createPortal(
					<div
						ref={portalRef}
						className={clsx(
							's-portal s-select-scroll-bar rounded-8 absolute z-50 max-h-[360pxr] overflow-x-hidden overflow-y-auto rounded-lg bg-white shadow-md',
							isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
							className
						)}
						style={{
							position: 'absolute',
							top: position.top,
							left: position.left,
							minWidth: position.width,
							zIndex,
						}}
					>
						{children}
					</div>,
					document.body
				)}
		</>
	);
};

export default CreatePortalLayout;
