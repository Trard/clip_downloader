export function parse_args(args) {
    let result = {};

    let flag_name = false;

    for (let arg of args) {
        if (flag_name) {
            result[flag_name] = arg;
            flag_name = false;
        }

        if (arg.startsWith("-")) {
            flag_name = arg.slice(1);
        }
    }

    return result;
}