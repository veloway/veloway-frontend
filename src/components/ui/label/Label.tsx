interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    className?: string; 
}

const Label = ({ children, className, ...props }: LabelProps) => {
    return (
        <label {...props} className={`block text-md font-medium text-tertiary ${className}`} >
            {children}
        </label>
    );
}

export default Label;