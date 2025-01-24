import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue?: any): [T, (value: T) => void] {
    const [state, setState] = useState(() => {
        // Initialize the state
        try {
            const value = window.localStorage.getItem(key);
            // Check if the local storage already has any values,
            // otherwise initialize it with the passed initialValue
            return value ? JSON.parse(value) : initialValue ? initialValue : "default";
        } catch (error) {
            return initialValue ? initialValue : "default";
        }
    });

    const setValue = (value: any) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setState(value);
        } catch (error) {
            console.log(error);
        }
    };

    return [state, setValue];
}

export default useLocalStorage;
