import { Message } from "discord.js";
import db from "../../db";

export default async function search(message: Message) {
    const title = message.content.replace("!films title", "").trim();

    db.films
        .byTitle(title)
        .then(async (films) => {
            if (!films.length) return await message.reply(`No film was found matching that title`);

            const titles = films.map((film) => `${film.title}: ${film.rt_score}`).join("\n");
            await message.reply(titles);
        })
        .catch(async (e) => {
            console.log(e);
            await message.reply(`Shitty code by andrew lmao`);
        });
}
