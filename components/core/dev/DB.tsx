"use client";

import { seedDB } from "@vape/actions/dev";
import { Button } from "@vape/components/ui/button";
import { Database } from "lucide-react";
import { useState } from "react";

export const DB = () => {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                zIndex: !open ? 999 : 99999,
            }}
            className={"fixed bottom-0"}
        >
            <div className={"relative w-full pointer-events-auto"}>
                {!open ? (
                    <div
                        className={"mb-36"}
                        style={{
                            padding: "0.9rem",
                        }}
                    >
                        <button
                            onClick={() => setOpen(!open)}
                            type={"button"}
                            className={
                                "rounded-full p-1 bg-yellow-500 text-white border-2 border-white"
                            }
                        >
                            <Database />
                        </button>
                    </div>
                ) : (
                    <Panel setOpen={setOpen} />
                )}
            </div>
        </div>
    );
};

const Panel = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
    const [loading, setLoading] = useState(false);

    const handleSeedDB = async () => {
        setLoading(true);
        try {
            await seedDB({
                reset: false,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                height: "calc(100vh / 2)",
            }}
            className={"w-screen bg-gray-600 flex"}
        >
            <div className={"w-full h-full overflow-auto flex flex-col"}>
                <div className={"relative pointer-events-auto"}>
                    <div
                        className={""}
                        style={{
                            padding: "0.9rem",
                        }}
                    >
                        <button
                            onClick={() => setOpen(!open)}
                            type={"button"}
                            className={
                                "rounded-xl px-2 py-1 bg-black text-white border-2 border-white"
                            }
                        >
                            Close
                        </button>
                    </div>
                </div>
                <div className="h-full flex flex-col justify-around items-center w-1/2 m-auto">
                    <div className={"w-full flex justify-center items-center space-x-3"}>
                        <Button type={"button"} onClick={handleSeedDB} disabled={loading}>
                            Seed DB
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
