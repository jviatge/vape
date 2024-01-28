export const CardUser = ({ name, role }: { name: string; role: string }) => {
    return (
        <div className={"flex items-center"}>
            <div className="relative mr-2 w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 border-2 border-primary">
                <svg
                    className="absolute w-11 h-11 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
            <div className={"flex flex-col items-start"}>
                <span>{name}</span>
                <span style={{ color: "red" }} className={"text-sm text-gray-600 italic"}>
                    {role}
                </span>
            </div>
        </div>
    );
};
