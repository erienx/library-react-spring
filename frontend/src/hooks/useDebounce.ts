import { useEffect, useState } from "react";


const useDebounce = (text: string, delay :number):string  =>{
    const [debouncedText, setDebouncedText] = useState(text);
    
    useEffect(()=> {
        const id = setTimeout(()=>setDebouncedText(text), delay);

        return () => {clearTimeout(id);}
    }, [text,delay])
    

    return debouncedText;
}
export default useDebounce;