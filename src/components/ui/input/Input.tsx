interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input = ({className, ...props }: InputProps) => (
	<input {...props} 
        className={`border border-gray-300 rounded p-1 w-full px-3 py-2 ${className}`}
    />    
);

export default Input;

