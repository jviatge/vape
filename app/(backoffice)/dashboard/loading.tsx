export default function loading() {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 dark:bg-opacity-20 z-50">
            <div className="text-center text-white">
                <svg
                    className="w-16 h-16 animate-spin text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        r="35"
                        strokeDasharray="164.93361431346415 56.97787143782138"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="2s"
                            keyTimes="0;1"
                            values="0 50 50;360 50 50"
                        ></animateTransform>
                    </circle>
                </svg>
                <p className="text-primary">Loading...</p>
            </div>
        </div>
    );
}
