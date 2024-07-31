import { SlashCommandBuilder, CommandInteraction, Message } from "discord.js";
import db from "../../db";

export default async function random(message: Message) {
    db.films
        .getAll()
        .then(async (data) => {
            const film = data[Math.floor(Math.random() * data.length)];

            await message.reply(`**${film.title}** - _${film.description.substring(0, 100)}..._`);
        })
        .catch(async (e) => {
            console.log(e);
            await message.reply(`Shitty code by andrew lmao`);
        });
}
