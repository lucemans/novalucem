import chalk from "chalk";

export default class Logger {
    prefix: string;
    constructor(prefix: string) {
        this.prefix = prefix;
    }
    success(str: string) {
        this.raw(str, chalk.greenBright('SUCCESS'));
    }
    info(str: string) {
        this.raw(str, chalk.cyan('INFO'));
    }
    error(str: string) {
        this.raw(str, chalk.red('ERROR'));
    }
    raw(str: string, infix: string) {
        console.log(this.prefix + " " + infix + " " + str);
    }
}