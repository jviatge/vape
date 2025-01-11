import { color } from "@vape/lib/color";
import * as fs from "fs";

type Option = {
    stringReplacers: StringReplacer[];
    templatePath: string;
    outPath: string;
};

type StringReplacer = {
    value: string;
    target: string;
};

// https://www.npmjs.com/package/generate-template-files

export default class Generator {
    private options: Option[];

    constructor(options: Option[]) {
        this.options = options;
    }

    public generate() {
        this.options.forEach((option) => {
            const contentTemplatePath = this.getTemplateContent(option.templatePath);
            const newContent = this.replaceString(contentTemplatePath, option.stringReplacers);
            const clearNameFile = option.templatePath.replace(".template", "").split("/").pop();
            const newPath =
                option.outPath +
                "/" +
                this.replaceString(clearNameFile ?? "", option.stringReplacers);
            const message = `Generated: > ${color.yellow(newPath)}`;
            console.log(message);
            this.writeToFile(newPath, newContent);
        });
    }

    private getTemplateContent(path: string): string {
        return fs.readFileSync(path, "utf-8");
    }

    private replaceString(content: string, stringReplacers: StringReplacer[]): string {
        stringReplacers.forEach((replacer) => {
            content = content.replaceAll(replacer.target, replacer.value);
        });

        return content;
    }

    private writeToFile(path: string, content: string) {
        fs.writeFileSync(path, content);
    }

    public static updateFile(path: string, content: string) {
        const message = `Update: > ${color.yellow(path)}`;
        console.log(message);
        fs.appendFileSync(path, content);
    }
}
