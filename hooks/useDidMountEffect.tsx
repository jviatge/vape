//This is a way to build this effect as a custom hook
import { useEffect, useRef } from "react";

const useDidMountEffect = (func: () => void, deps = []) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
};

export default useDidMountEffect;
