const Chip = ({ label }: { label: string }) => (
	<div className='flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm'>
		{label}
	</div>
);

export default Chip;
