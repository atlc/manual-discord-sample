import { Message } from "discord.js";
import db from "../../db";

export default async function good_score(message: Message) {
    const score = message.content.replace("!films >", "").replace(" ", "");

    db.films
        .gt(score)
        .then(async (films) => {
            const titles = films.map((film) => `${film.title}: ${film.rt_score}`).join("\n");
            await message.reply(titles);
        })
        .catch(async (e) => {
            console.log(e);
            await message.reply(`Shitty code by andrew lmao`);
        });
}
