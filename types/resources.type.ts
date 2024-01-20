import dynamicIconImports from "lucide-react/dynamicIconImports"

export type Resource = {
    params:{
        label:string,
        icon: keyof typeof dynamicIconImports,
    },
    header?:{
        disabledCreate?:boolean,
        disabledEdit?:boolean,
    }
    form:{
        name:string,
        type:string
    }[]
}

export type RessourceParamsWithRoute = {route:string} & Resource["params"]
    