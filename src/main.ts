import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import { TwitterController } from './controller/twitterController';
import { GetWeatherData } from './usecase/getWeatherData.usecase';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const prefix = '>>';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});
const discordToken = process.env.TOKEN;
if (discordToken === undefined) {
    throw new Error('Failed get discordToken');
}

client.on('ready', async () => {
    if (client.user === null) {
        throw new Error('Failed get client');
    }
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (m) => {
    if (!m.content.startsWith(prefix) || m.author.bot) return;

    if (m.content.length === 0) return;

    const args = m.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    if (command === 'supervise_spaces') {
        const twitterController = TwitterController.getInstance();
        twitterController.searchSpaces(args);
        // const getTwitterSpaceData = new GetTwitterSpaceData();
        // const res = await getTwitterSpaceData.startGetTwitterSpace(args);
        // if (res === undefined) return;
        // m.channel.send(res);
    }

    if (command === 'weather') {
        const getweatherData = new GetWeatherData(process.env.WEATHER_TOKEN);
        const res = await getweatherData.getWeatherInfo(args);
        if (res === undefined) return;
        m.channel.send(res);
    }
});

client.login(discordToken);
