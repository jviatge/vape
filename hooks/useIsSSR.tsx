import { useEffect, useState } from "react";

//// FIX Hydratation failed ////
// https://github.com/vercel/next.js/discussions/35773

const useIsSSR = () => {
    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        setIsSSR(false);
    }, []);

    return isSSR;
};

export default useIsSSR;
