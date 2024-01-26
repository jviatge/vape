import { RessourceParamsWithRoute, Resource } from '@/types/resources.type';
import fs from 'fs';
import path, { basename } from 'path';
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const rscGetOne = async (resources:string) => {
    try {
        return await import('~/resources/' + resources).then((module) => module.default)
      } catch {
        return null
    }
}

export const rscGetAllParams = async ():Promise<RessourceParamsWithRoute[]> => {
    //const baseDir = path.resolve(__dirname, '../');
    const baseDir = basename('../');

    //console.log(baseDir,basename('../'));

    try {
        const files = fs.readdirSync(path.join(baseDir, 'resources'));
        const params = await Promise.all(files.map(async (file):Promise<RessourceParamsWithRoute> => {
            const paramsRsc:Resource["params"] = await import("~/resources/" +  file.split(".")[0]).then((module) => module.default.params)
            return {
                ...paramsRsc,
                ...{route: file.split(".")[0]}
            }}));
        return params;
    } catch {
        return [];
    }
}

export const rscGetAllData = async (model:Prisma.ModelName):Promise<any> => {

    return await prisma[model].findMany()
}
