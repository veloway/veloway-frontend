import { Button, CircularProgress } from "@mui/material";

interface LoadingFindDriverProps {
    handleCancelar: () => void;
}

export const LoadingFindDriver = ({handleCancelar}: LoadingFindDriverProps) => {
	return (
		<>
			<div className='flex justify-center items-center h-full w-full'>
				<div className='flex flex-col gap-10'>
					<picture className='flex justify-center'>
						<img src='/gifs/buscar-conductor.gif' className='rounded-md w-[50%]' alt='' />
					</picture>
					<div className='flex flex-col items-center gap-4'>
						<p className='text-xl font-semibold'>Buscando conductores disponibles...</p>
						<CircularProgress />
					</div>
					<div className='flex justify-center'>
						<Button onClick={handleCancelar} variant='contained' color='primary'>
							Cancelar
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
