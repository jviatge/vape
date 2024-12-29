import { Clipboard } from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "./CopyToClipboard";

export const ConfigMdx = {
    em: (props: any) => <i {...props} />,
    code: ({ className, ...props }: any) => {
        const match = /language-(\w+)/.exec(className || "");

        return match ? (
            <div className={"relative"}>
                <div className={"absolute top-2 right-2 z-10"}>
                    <CopyToClipboard
                        text={props.children}
                        /* onCopy={() => {
                            toast({
                                title: "Code copied",
                            });
                        }} */
                    >
                        <Clipboard className={"text-gray-500 hover:text-gray-300"} />
                    </CopyToClipboard>
                </div>
                <SyntaxHighlighter
                    node={null}
                    className={"p-2 rounded-sm"}
                    style={atomOneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                />
            </div>
        ) : (
            <span
                style={{
                    backgroundColor: "rgb(40, 44, 52)",
                    color: "rgb(171, 178, 191)",
                }}
                className={"py-1 rounded-sm m-1 px-3"}
                {...props}
            />
        );
    },
    h2: (props: any) => <h2 className={"text-2xl font-bold my-4"} {...props} />,
    h3: (props: any) => <h3 className={"text-xl font-bold my-4"} {...props} />,
    hr: (props: any) => <hr className={"my-4"} {...props} />,
    p: (props: any) => <p className={"my-4"} {...props} />,
};
function useRef(arg0: null) {
    throw new Error("Function not implemented.");
}
