import util from "node:util";
import { exec } from "node:child_process";

const aexec = util.promisify(exec);

export async function run(command) {
    let { stdout } = await aexec(command);

    return stdout;
}