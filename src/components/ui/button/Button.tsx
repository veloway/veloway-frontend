import "./Button.css";

interface Props {
	children: React.ReactNode;
	className?: string;
	color?: string;
}

const Button = ({ children, className, color }: Props) => {
	return (
		<button
			className={`${className} px-3 py-2 rounded-md inline-flex items-center gap-2 justify-center font-medium relative overflow-hidden box-border transition-all hover:!bg-opacity-50 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-default focus:outline-none`}
			style={{ backgroundColor: color }}>
			{children}
		</button>
	);
};

export default Button;
