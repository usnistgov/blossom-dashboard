// This file contains the 



/** Provides placement information about the error by unwrapping the stack
 * 
 * @param error - The external error if present
 * @returns Descriptor of the error location
 * 
 * @example `${pinError(new Error())} ${error}`
 * @example console.log(`${pinError(theErrorToLog)}: ${JSON.stringify(data, null, 2)}`);
 */
export function pinErrorMsg(error: any = undefined, depth: int = 2):string {  
    const index = (!error ? 2 : ((depth>=0)?depth:1))
    const e = !error ? new Error(): error;
    const regex = /\((.*):(\d+):(\d+)\)$/
    if(e.stack){
        const match = regex.exec(e.stack.split("\n")[index]);
        if (match){
            return `File: ${match[1]} @Ln:${match[2]} Col:${match[3]}\n`;
        }
    }
    return `Couldn't locate Error`
    // return {filepath: match[1], line: match[2],column: match[3]};
  }



  /** Provides placement information for the location of the message and origin of the log entry  by unwrapping the stack
 *
 * @param specialPrefix - Additional prefix if needed
 * @param depth (default=2) stack diving depth - 2 will point to the correct place
 * @returns String with the CALLERS "FILE: LINE: Col:" location
 * 
 * @example console.log(`${pinLocation(THIS_FILE)}: ${JSON.stringify(event, null, 2)}`);
 * @example console.log(`${pinLocation(THIS_FILE)}: ${JSON.stringify(context, null, 2)}`);
 */
export function pinLocationMsg(specialPrefix = '', depth = 2) {
    const index = (!specialPrefix ? 2 : ((depth >= 0) ? depth : 1));
    const error = new Error();
    const regex = /\((.*):(\d+):(\d+)\)$/;
    if (error.stack) {
        const match = regex.exec(error.stack.split("\n")[index]);
        if (match) {
            return `${specialPrefix ? specialPrefix + '-' : '@'}File: ${match[1]} @Line:${match[2]} Col:${match[3]}\n`;
        }
    }
    return `No Location Found for Caller in Trace-Stack`;
    // return {filepath: match[1], line: match[2],column: match[3]};
}