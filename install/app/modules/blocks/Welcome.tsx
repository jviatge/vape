import packageJsonVape from "@vape/package.json";
import packageJsonProject from "../../package.json";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@vape/tools";

const Welcome = () => {
    return (
        <div className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Welcome on Vape</CardTitle>
                <CardDescription>Vape version : {packageJsonVape.version}</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
                <p>
                    Vape is a tool to help you create a React project with a lot of features and a
                    lot of tools. You can create a project with a lot of features like routing,
                    state management, form management, and a lot of other features.
                </p>
                <br />
                <p>
                    You can find the documentation on the{" "}
                    <a href="https://github.com/jviatge/vape" target="_blank" rel="noreferrer">
                        Github repository
                    </a>
                    .
                </p>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                Version project : {packageJsonProject.version}
            </CardFooter>
        </div>
    );
};

export default Welcome;
