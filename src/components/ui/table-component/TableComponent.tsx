import { ReactNode } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';

interface TableProps {
	title?: string;
	columns: string[];
	children: ReactNode;
	className?: string;
}

export default function TableComponent({ title, columns, children, className }: TableProps) {
	return (
		<div className={`m-8 flex flex-col mx-auto ${className}`}>
			{title && <h3 className='font-medium text-xl text-tertiary mb-3'>{title}</h3>}
			<TableContainer component={Paper} className="shadow-md rounded-md">
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
								<TableCell key={index} className='bg-tertiary text-[#fff] py-2 px-4 text-center '>{column}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{children}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
