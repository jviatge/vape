export const Notification = ({ number }: { number?: number }) => {
    return number && number > 0 ? (
        <div className="absolute right-0 top-0 translate-x-2.5 -translate-y-2.5">
            <span className="relative flex w-5 h-5 ">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <div className="relative rounded-full w-5 h-5 bg-red-500 text-xs font-medium flex justify-center items-center">
                    <span>{number}</span>
                </div>
            </span>
        </div>
    ) : null;
};
