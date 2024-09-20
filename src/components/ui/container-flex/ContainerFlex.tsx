interface Props {
    children: React.ReactNode;
}

export default function ContainerFlex({children}: Props) {
  return (
    <div className="flex justify-center items-center">
        {children}
    </div>
  )
}
