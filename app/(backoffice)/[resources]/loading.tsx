import { Loading } from "@vape/components/ui/loading";

export default function loading() {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 dark:bg-opacity-20 z-50">
            <Loading />
        </div>
    );
}
