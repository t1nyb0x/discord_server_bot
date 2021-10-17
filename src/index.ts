// import { REST } from '@discordjs/rest';
import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';

dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const discordToken = process.env.TOKEN;

client.on('ready', () => {
    if (client.user === null) {
        throw new Error('Failed get client');
    }
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(discordToken);
