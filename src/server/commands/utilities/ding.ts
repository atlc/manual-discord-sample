import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("ding").setDescription("Replies with dong!"),

    async execute(interaction: CommandInteraction) {
        await interaction.reply("dong!");
    },
};
