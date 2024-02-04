class Command {
    static readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    static async askQuestion(question: string) {
        return new Promise((resolve) => {
            this.readline.question(question, (answer: any) => {
                resolve(answer);
            });
        });
    }
}

export { Command };
