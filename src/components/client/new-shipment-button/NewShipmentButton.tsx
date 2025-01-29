import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

export const NewShipmentButton = () => {
	return (
		<Button
			variant='outlined'
			color='primary'
			startIcon={<AddIcon className='!text-2xl lg:text-3xl' />}
			LinkComponent={Link}
			className='rounded-md flex h-full border-2'
			href='/client/shipment-register'>
			Nuevo envío
		</Button>
	);
};
