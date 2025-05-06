import clsx from 'clsx';
import React from 'react';

type Props = {
	label: string;
	className?: string;
	onclick?: () => void;
};

const Badge = ({ label, className, onclick }: Props) => {
	return (
		<span
			className={clsx('rounded-full border border-[#ddd] p-2 text-[13px] text-[#222]', className)}
			onClick={() => onclick?.()}
		>
			{label}
		</span>
	);
};
export default Badge;
