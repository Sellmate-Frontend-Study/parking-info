import clsx from 'clsx';

const Hr = ({ className }: { className?: string }) => (
	<div className={clsx('h-[1px] w-full bg-gray-300', className)} />
);
export default Hr;
