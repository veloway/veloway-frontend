interface Props{
    textoTit: string;
    textoCuerpo: string;
}


export default function CardTC({textoTit, textoCuerpo}: Props){
    return(
        <>
            <div className="p-4 bg-blue-500 w-[30%] rounded-md text-white ">
                <p className="text-lg">
                    {textoTit}
                </p>
                <p className="italic">
                    {textoCuerpo}
                </p>
            </div>
        </>
    );
}