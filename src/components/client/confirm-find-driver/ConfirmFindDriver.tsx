export const ConfirmFindDriver = () => {
	return (
		<div className='relative flex justify-center items-center h-screen w-full overflow-hidden'>
			<div className='flex flex-col items-center gap-4 z-10'>
				<div
					className={`relative w-16 h-16 rounded-full bg-green-500 transition-transform duration-500`}>
					<svg
						className={`absolute inset-0 w-10 h-10 m-auto text-white transition-opacity duration-500`}
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
					</svg>
				</div>
				<p className={"text-xl font-semibold"}>Conductor encontrado</p>
			</div>
		</div>
	);
};
