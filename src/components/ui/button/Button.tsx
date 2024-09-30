interface ButtonProps {
	children: React.ReactNode;
	className?: string;
	bgColor?: string;
	textColor?: string;
	iconPosition?: "left" | "right";
	icon?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "secondary" | "tertiary";
	onClick?(): void;
}

const Button = ({ 
	children, 
	className, 
	bgColor, 
	textColor,
	iconPosition = "left",
	type = "button",
	icon = null,
	variant = "primary",
	onClick
}: ButtonProps) => {
	const styles = {
		backgroundColor: bgColor,
		color: textColor,
	}
	const buttonVariants = {
		primary: "bg-primary text-secondary hover:opacity-90", 
		secondary: "bg-secondary text-primary border-[1px] border-primary hover:bg-primary hover:text-secondary",
		tertiary: "bg-secondary text-tertiary hover:bg-tertiary hover:text-secondary",
	}
	return (
		<button
			className={`${className} ${buttonVariants[variant]} px-3 py-2 rounded-md inline-flex items-center gap-2 justify-center font-medium transition-all`}
			style={styles}
			onClick={onClick}
			type={type}
		>
			{iconPosition === "left" && icon} {children}{" "}
			{iconPosition === "right" && icon}
		</button>
	);
};

export default Button;
