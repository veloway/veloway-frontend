import { ReactNode } from "react";
import ContainerFlex from "../container-flex/ContainerFlex";
import Button from "../button/Button";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

interface TableProps {
	title: string;
	columns: string[];
	children: ReactNode;
}

export default function Table({ title, columns, children }: TableProps) { 

    return (
		<div className='m-8 flex flex-col w-3/4 mx-auto'>
			<h3 className='font-medium text-lg text-[var(--color-tertiary)] mb-2'>{title}</h3>
			<table className='w-full bg-[var(--color-secondary)] table-auto border-collapse rounded-md overflow-hidden shadow-lg shadow-[var(--color-quaternary)]'>
				<thead className='w-full'>
					<tr>
						{columns.map((column, index) => (
							<th
								key={index}
								className='bg-[var(--color-tertiary)] text-[#fff] py-2 px-4 text-center'>
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
            <ContainerFlex className="gap-4 p-6">
                <Button
                    variant="secondary"
                    className='!rounded-full !p-0 transform border-2'
                    icon={<IoIosArrowDropleftCircle className='text-3xl text-primary hover:text-secondary' />}>
                    {" "}
                </Button>
                <span>
                    Pagina {1} de {4}
                </span>
                <Button
                    variant="secondary"
                    className='!rounded-full !p-0 transform border-2'
                    icon={<IoIosArrowDroprightCircle className='text-3xl text-primary hover:text-secondary' />}>
                    {" "}
                </Button>
            </ContainerFlex>
		</div>
	);
}
