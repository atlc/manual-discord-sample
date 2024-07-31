import { Message } from "discord.js";
import db from "../../db";

export default async function all(message: Message) {
    db.films
        .getAll()
        .then(async (films) => {
            const mapped = films.map((film) => `**${film.title}** (${film.release_date}, ${film.rt_score}/100)\n*${film.description.substring(0, 50)}...*`);

            await message.reply(mapped.join("\n\n").substring(0, 2000));
        })
        .catch(async (e) => {
            console.log(e);
            await message.reply(`Shitty code by andrew lmao`);
        });
}
