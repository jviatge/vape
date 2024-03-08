import { DB } from "./DB";

export const DevTools = () => {
    return (
        <div
            style={{
                top: "100%",
                left: "0%",
                transform: "translate(0%, -100%)",
                zIndex: 999999999,
            }}
            className="absolute"
        >
            <div className="relative">
                <DB />
            </div>
        </div>
    );
};
