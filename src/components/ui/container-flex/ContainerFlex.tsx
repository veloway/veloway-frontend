interface Props {
	children: React.ReactNode;
	className?: string;
}

export default function ContainerFlex({ children, className }: Props) {
	return <div className={`${className} flex justify-center items-center`}>{children}</div>;
}
