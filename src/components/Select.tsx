'use client';

import { useEffect, useId, useRef, useState } from 'react';
import useClientRect from '@/hooks/useClientRect';
import SelectInput from './select/SelectInput';
import CreatePortalLayout from '@/components/CreatePortalLayout';
import { type SelectOption } from '@/types/selectOption';
import SelectOptionItem from '@/components/select/SelectOptionItem';

export interface SelectProps {
	options: SelectOption[];
	value: SelectOption | null;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	onChange?: (option: SelectOption) => void;
}

const Select = ({
	options,
	value,
	placeholder = '선택',
	disabled = false,
	className = '',
	onChange,
}: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<SelectOption | null>(null);
	const selectId = useId();
	const sSelectRef = useRef<HTMLDivElement | null>(null);
	const selectRect = useClientRect(sSelectRef);
	const optionHeight = 33;

	const handleUpdateSelect = (option: SelectOption) => {
		setSelectedValue(option);
		onChange?.(option);
	};

	useEffect(() => {
		setSelectedValue(value);
		const portalLayout = document.querySelector('.s-portal.s-select-scroll-bar');
		const index = options.findIndex((option) => option.value === value?.value);
		if (index !== -1 && portalLayout) {
			const scrollTop = index * optionHeight;
			portalLayout.scrollTop = scrollTop;
		}
	}, [value]);

	return (
		<>
			<SelectInput
				selectId={selectId}
				value={selectedValue?.label || ''}
				isSelectOpen={isOpen}
				placeholder={placeholder}
				disabled={disabled}
				className={className}
				setIsOpen={setIsOpen}
				sSelectRef={sSelectRef}
			/>
			<CreatePortalLayout
				parentRef={sSelectRef}
				clientRect={selectRect}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				parentId={selectId}
			>
				<div className='p-1'>
					{options.map((option) => (
						<SelectOptionItem
							key={option.value}
							option={option}
							selected={option.value === value?.value}
							onClick={handleUpdateSelect}
							disabled={option.disabled}
							setIsOpen={setIsOpen}
						/>
					))}
				</div>
			</CreatePortalLayout>
		</>
	);
};

export default Select;
