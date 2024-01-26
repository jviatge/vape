import dynamicIconImports from "lucide-react/dynamicIconImports"

export type Resource = {
    params:{
        label:string,
        icon: keyof typeof dynamicIconImports,
        model:string,
    },
    header?:{
        disabledCreate?:boolean,
        disabledEdit?:boolean,
    }
    table:{
        label?:string,
        name:string,
        type:"string"|"date"|"boolean",
        format?: (value:any) => string
    }[],
    form:{
        name:string,
        type:string
    }[]
}

export type RessourceParamsWithRoute = {route:string} & Resource["params"]
    