import chalk from "chalk";

export default class Logger {
    prefix: string;
    constructor(prefix: string) {
        this.prefix = prefix;
    }
    dumb(str: string) {
        this.raw(str, chalk.gray('DUMB'));
    }
    success(str: string) {
        this.raw(str, chalk.greenBright('SUCCESS'));
    }
    warn(str: string) {
        this.raw(str, chalk.yellowBright('WARN'));
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