import { Message } from "discord.js";

export default async function help(message: Message) {
    await message.reply(`
      Films Menu! To start a command, begin it with !films.
      \t\`!films > SomeNumber\` will get you all films with a Rotten Tomatoes Score greater than that number
      \t\`!films all\` will get you all films with their titles and descriptions
      \t\`!films random\` will get info for a film at random
      \t\`!films title SOME TITLE HERE\` will search for info for a film named 'Some Title Here'
      \t\`!films help\` or just calling \`!films\` by itself will get this help menu
    `);
}
