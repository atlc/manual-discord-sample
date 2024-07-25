import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import config from "./config";
import commands from "./commands";
import db from "./db";

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, unknown>;
    }
}

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

for (const commandKey in commands) {
    const commandGroup = commands[commandKey as keyof typeof commands];

    for (const fileKey in commandGroup) {
        const command = commandGroup[fileKey as keyof typeof commandGroup];

        if ("data" in command && "execute" in command) {
            //@ts-ignore
            const { name, description } = command.data;
            client.commands.set(name, command);
        } else {
            console.log(`[WARNING] The command at ${command} is missing a required "data" or "execute" property.`);
        }
    }
}

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        //@ts-ignore
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
        } else {
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }
});

client.on("messageCreate", async (message) => {
    console.log(message.content);

    if (message.content.startsWith("films >")) {
        const score = message.content.replace("films >", "").replace(" ", "");
        db.films.gt(score).then(async (films) => {
            const titles = films.map((film) => `${film.title}: ${film.rt_score}`).join("\n");
            await message.reply(titles);
        });
    }
});

client.login(config.discord.token);
