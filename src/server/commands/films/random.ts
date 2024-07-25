import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import db from "../../db";
import { client } from "../../server";

//@ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};

export default {
    data: new SlashCommandBuilder()
        .setName("films")
        .setDescription("Gets all films above a score threshold!")
        .addStringOption((option) => option.setName("score").setDescription("The minimum score required").setRequired(true)),
    async execute(interaction: CommandInteraction) {
        // db.films
        //     .getAll()
        //     .then(async (data) => {
        //         const film = data[Math.floor(Math.random() * data.length)];

        //         await interaction.reply(`**${film.title}** - _${film.description.substring(0, 100)}..._`);
        //     })
        //     .catch(async (e) => {
        //         console.log(e);
        //         await interaction.reply(`Shitty code by andrew lmao`);
        //     });

        await interaction.reply(JSON.stringify(interaction.options.get("score")));
    },
};
