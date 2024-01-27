export default async function PageOneRsc({
    params: { resources, id },
}: {
    params: { resources: string; id: string };
}) {
    return (
        <div>
            {resources}/{id}
        </div>
    );
}
