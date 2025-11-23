function timestamp(tmp?: number) {
    const milliseconds: number = (tmp ? tmp : Date.now());

    const dateObject = new Date(milliseconds)
    return dateObject.toLocaleDateString();
}

class Debug {    
    timestamp = timestamp;

    log(str: string) {
        console.log(`[${__filename}] [${timestamp()}] ${str}`)
    }

    error(str: string) {
        console.log(`[${__filename}] [${timestamp()}] ${str}`)
    }
}

module.exports = new Debug()