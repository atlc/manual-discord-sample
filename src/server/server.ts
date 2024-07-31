import { Client, Events, GatewayIntentBits } from "discord.js";
import config from "./config";
import film_delegator from "./commands/films";

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.content.startsWith("!films")) return film_delegator(message);

    if (message.content.startsWith("!")) {
        await message.reply(`
        The following command trees are available:
          \`!films\` or \`!films help\` 
        `);
    }
});

client.login(config.discord.token);
