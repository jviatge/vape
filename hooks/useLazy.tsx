import { Reducer, useEffect, useReducer } from "react";

/**
 * Action type when a promise starts `resolving`.
 */
export const IMPORT_INIT = "IMPORT_INIT";

/**
 * Action type when a promise is `fulfilled`.
 */
export const IMPORT_SUCCESS = "IMPORT_SUCCESS";

/**
 * Action type when a promise is `rejected`.
 */
export const IMPORT_FAILURE = "IMPORT_FAILURE";

/**
 * Well, it is a `default` import.
 */
export interface DefaultImport<T> {
    default: T;
}

/**
 * Here a NamedImport consist of one or multiple keys.
 */
export type NamedImport<T> = { [K in keyof T]: T[K] };

/**
 * The result from a dynamic import could be a `default` import or a `named` import.
 */
export type DynamicImportResult<T> = DefaultImport<T> | NamedImport<T>;

/**
 * The import function returns a promise from a dynamic import.
 */
export interface ImportFn<T> {
    (): Promise<DynamicImportResult<T>>;
}

/**
 * This are all the possible values `useLazy` handles which can be an array of
 * the result of a `default import` or an array of the result of a `name import`.
 * */
export type Result<T> = Array<T> | Array<NamedImport<T>> | null;

/**
 * This is the state that `useLazy` uses and returns when dealing with dynamic imports.
 */
export interface UseLazyResult<T> {
    isLoading: boolean;
    result: Result<T>;
}

/**
 * Every action for every step when a dynamic import is transition.
 */
export type Action<T> =
    | { readonly type: typeof IMPORT_INIT }
    | { readonly type: typeof IMPORT_SUCCESS; payload: Result<T> }
    | { readonly type: typeof IMPORT_FAILURE; payload: Result<T> };

const initialState = {
    isLoading: false,
    result: [],
};

function makeReducer<T>(): Reducer<UseLazyResult<T>, Action<T>> {
    return (state: UseLazyResult<T> = initialState, action: Action<T>): UseLazyResult<T> => {
        switch (action.type) {
            case IMPORT_INIT:
                return {
                    ...state,
                    isLoading: true,
                };
            case IMPORT_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    result: action.payload,
                };
            case IMPORT_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    result: action.payload,
                };
            default:
                return state;
        }
    };
}

/**
 * `useLazy` lets you handle `lazy-loading` assets in React by taking and array of functions
 * that returns a promise from dynamic imports and predidate that decides when to execute
 * the import
 */
function useLazy<T>(importFns: Array<ImportFn<T>>, shouldImport = true): UseLazyResult<T> {
    const reducer = makeReducer<T>();

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                if (!shouldImport) {
                    return;
                }
                dispatch({ type: IMPORT_INIT });
                // call each dynamic import inside `importFns` and resolve each promise
                const modules = await Promise.all(importFns.map((i) => i()));

                dispatch({
                    type: IMPORT_SUCCESS,
                    payload: modules.map(handleImport),
                });
            } catch (error: any) {
                dispatch({ type: IMPORT_FAILURE, payload: error });
            }
        })();
    }, [importFns, shouldImport]);

    /* console.log(state); */

    /* return handleThrow(state); */
    return handleThrow(state);
}

function handleImport<T>(importObj: DynamicImportResult<T>): T | NamedImport<T> {
    // check if in fact is a default import.
    if (isDefaultImport(importObj)) {
        return importObj.default;
    }

    // otherwise is named import.

    const keys = Object.keys(importObj);

    // is an object with a bunch of stuff, so just return it the way it is.
    if (keys.length > 1) {
        return importObj;
    }

    // otherwise is a single-keyed named import.
    let namedSingleValue = {} as T;

    // there's only one key, so just grab its value.
    Object.keys(importObj).forEach((key: string) => {
        // @ts-ignore
        namedSingleValue = importObj[key];
    });

    // return the single value from the named import.
    return namedSingleValue;
}

function handleThrow<P>(errorOrObj: UseLazyResult<P>): UseLazyResult<P> {
    if (errorOrObj.result) {
        // rejection from `import()` for some reason is not and instance of Error
        // that's why the "Object.getPrototypeOf(errorOrObj).name"
        if (
            errorOrObj.result instanceof Error ||
            Object.getPrototypeOf(errorOrObj.result).name === "Error"
        ) {
            throw new Error(`useLazy ${errorOrObj.result}`);
        }
    }
    return errorOrObj;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDefaultImport<T>(obj: any): obj is DefaultImport<T> {
    return "default" in obj;
}

export default useLazy;
