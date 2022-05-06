import { useRef, useEffect } from "react";

const useUnload = fn => {
    const cb = useRef(fn);

    useEffect(() => {
        const onUnload = cb.current;
        window.addEventListener('unload', onUnload);
        return () => {
            window.removeEventListener('unload', onUnload);
        };
    }, [cb]);
};

export default useUnload;