import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import { Translate } from './modules/translate/translate';

const prefix = '>>';
dotenv.config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
const discordToken = process.env.TOKEN;
if (discordToken == undefined) {
    throw new Error('Failed get discordToken');
}

client.on('ready', () => {
    if (client.user === null) {
        throw new Error('Failed get client');
    }
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (m) => {
    if (!m.content.startsWith(prefix) || m.author.bot) return;

    const args = m.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    if (command === 'translatelist') {
        const translate = new Translate();
        m.channel.send(translate.translateList());
    }
});

client.login(discordToken);
