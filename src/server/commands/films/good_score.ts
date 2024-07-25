import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("betterthan")
        .setDescription("Supply a number to see all films with a Rotten Tomatoes Score greater than this number"),
    execute: async (interaction: CommandInteraction) => {
        await interaction.reply(JSON.stringify(interaction));
    },
};
