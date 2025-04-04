const MARKERS = [
	{
		label: '만차',
		value: 'jammed',
	},
	{
		label: '혼합',
		value: 'congested',
	},
	{
		label: '원활',
		value: 'smooth',
	},
	{
		label: '기본정보',
		value: 'normal',
	},
];

const MarkerTypeNotice = () => {
	return (
		<div className='absolute right-1 bottom-1 z-10 flex flex-nowrap items-center gap-x-[8px] rounded-md border border-gray-300  px-1.5 py-1 backdrop-blur-lg'>
			{MARKERS.map((marker) => (
				<div
					key={marker.value}
					className='flex flex-nowrap items-center text-[10px] text-gray-700'
				>
					<img
						src={`/${marker.value}.svg`}
						alt={marker.value}
						className='mr-[4px] w-[18px]'
					/>
					{marker.label}
				</div>
			))}
		</div>
	);
};

export default MarkerTypeNotice;
