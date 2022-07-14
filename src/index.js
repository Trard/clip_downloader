import { run } from "./run.js";
import { parse_args } from "./utils/index.js";
import { mkdirSync, existsSync } from "fs";

mkdirSync("./videos", { recursive: true });

async function main() {
    let { link, ss, to } = parse_args(process.argv);

    let title = link.match(/=(.*)/)[1];

    if (existsSync(`videos/${title}_${ss}-${to}.mp4`)) {
        throw `File videos/${title}_${ss}-${to}.mp4 exists already`;
    }

    let urls = await run(`yt-dlp -g ${link}`);
    let [video_url, audio_url] = urls.split("\n");

    await run(
        `ffmpeg -ss '${ss}' -to '${to}' -i '${video_url}' -ss '${ss}' -to '${to}' -i '${audio_url}' videos/${title}_${ss}-${to}.mp4`
    );
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
