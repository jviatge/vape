import { rscGetAllData, rscGetAllParams } from '@/actions/resources';
import { Resource } from '@/types/resources.type';
import { notFound } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from '@vape/components/ui/card';

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

  const rscData = await getRsc(resources)

  const model = await import('~/models/' +  rscData.params.model + ".model").then((module) => module.default)
  const data = await model.findMany()

  return <>
    <Card className='overflow-hidden'>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className='bg-card'>
          <TableRow>
            {rscData.table.map((column) => (
              <TableHead key={column.name}>{column.label ?? column.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className='bg-primary-foreground'>

          {data.map((row:Record<string,string|number>,index:number) => (
            <TableRow key={index}>
              {rscData.table.map((column) => (
                <TableCell key={column.name}>{row[column.name] ?? "-"}</TableCell>
              ))}
            </TableRow>
          ))}
        
        </TableBody>
      </Table>
    </Card>
  </>
};
