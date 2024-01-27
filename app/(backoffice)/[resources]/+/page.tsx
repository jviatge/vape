export default async function PageNewRsc({
    params: { resources },
}: {
    params: { resources: string };
}) {
    return <div>New {resources}</div>;
}
