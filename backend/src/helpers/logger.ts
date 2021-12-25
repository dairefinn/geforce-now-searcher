enum Colours {
    reset = "\x1b[0m",
    fgBlack = "\x1b[30m",
    fgRed = "\x1b[31m",
    fgGreen = "\x1b[32m",
    fgYellow = "\x1b[33m",
    fgBlue = "\x1b[34m",
    fgMagenta = "\x1b[35m",
    fgCyan = "\x1b[36m",
    fgWhite = "\x1b[37m"
}

export class Logger {
    prefix: string;

    constructor(prefix: string = '') {
        this.prefix = prefix;
    }

    doLog(color: Colours, message: string) {
        if (this.prefix.length > 0) {
            console.log(`${color}${this.prefix}:${Colours.reset}`, message);
        } else {
            console.log(`${color}${message}${Colours.reset}`);
        }
    }

    // TODO: Disable these unless verbose logging enabled in env
    info(message: string) {
        this.doLog(Colours.fgCyan, message);
    }

    warn(message: string) {
        this.doLog(Colours.fgYellow, message);
    }

    error(message: string) {
        this.doLog(Colours.fgRed, message);
    }

    success(message: string) {
        this.doLog(Colours.fgGreen, message);
    }
}
