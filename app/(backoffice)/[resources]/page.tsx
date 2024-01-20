import { rscGetAllParams } from '@/actions/resources';
import { Resource } from '@/types/resources.type';
import { notFound } from 'next/navigation'

export async function generateStaticParams() {

  const rscAllParams = await rscGetAllParams()
  const resources:string[] = []

  rscAllParams.map((rsc) => resources.push(rsc.route))
  
  return resources.map(resource => ({resources: resource}))
}

async function getRsc(resources:string):Promise<Resource> {
  try {
    return await import('~/resources/' +  resources).then((module) => module.default)
  } catch (error) {
    console.log(error)
    return notFound()
  }
}

export default async function PageRsc ({
  params: {resources}
}:{params:{resources:string}}) {

  const data = await getRsc(resources)

  return <main>
    {JSON.stringify(data)}
  </main>
};
