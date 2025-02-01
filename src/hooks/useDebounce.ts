import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            setDebouncedValue(value);
        },delay);

        return () => clearTimeout(timeOut);
    },[value])

    return debouncedValue;
}