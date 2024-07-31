import { Message } from "discord.js";
import all from "./all";
import good_score from "./good_score";
import random from "./random";
import search from "./search";
import help from "./help";

export default async function film_delegator(message: Message) {
    const stripped = message.content.replace("!films", "").trim();

    if (stripped.startsWith(">")) return good_score(message);
    if (stripped.startsWith("all")) return all(message);
    if (stripped.startsWith("help")) return help(message);
    if (stripped.startsWith("random")) return random(message);
    if (stripped.startsWith("title")) return search(message);

    await help(message);
}
