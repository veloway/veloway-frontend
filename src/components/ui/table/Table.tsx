type Data = Object[];

interface TableProps {
    title: string;
    columns: string[];
    data: Data;
}

export default function Table({ title, columns, data}:TableProps) {

    return (
        <div className="m-8">
            <h3 className="text-lg">{title}</h3>
            <table className="w-[1300px] bg-[var(--color-quaternary)] ">
                <thead>
                    <tr>
                        {
                            columns.map((column, index) => (
                                <th key={index}>
                                    {column}
                                </th>
                            ))
                        } 
                    </tr>
                </thead>
                <tbody>
                {data.map((data, index) => (
                        <tr key={index}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
