import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import { TwitterController } from './controller/twitterController';
import { WeatherController } from './controller/weatherController';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});

console.log(process.env.ENVIRONMENT);
switch (process.env.ENVIRONMENT) {
    case 'production':
        // eslint-disable-next-line no-var
        var discordToken = process.env.PRODUCTION_TOKEN;
        // eslint-disable-next-line no-var
        var prefix = '>>';
        console.log('Loaded token');
        break;

    case 'develop':
        // eslint-disable-next-line no-var
        var discordToken = process.env.DEVELOP_TOKEN;
        // eslint-disable-next-line no-var
        var prefix = '??';
        break;
}

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

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

    // スペース情報取得
    if (command === 'supervise_spaces') {
        const twitterController = TwitterController.getInstance();
        const checkResult = twitterController.checkScreenName(args);
        if (checkResult.error && checkResult.errorMessage) {
            m.channel.send(checkResult.errorMessage);
        } else {
            m.channel.send(await twitterController.searchSpaces(args));
        }
    }

    // 天気予報
    if (command === 'weather') {
        const weatherController = WeatherController.getInstance();
        const checkResult = weatherController.checkWeatherArgs(args);
        if (checkResult.error && checkResult.errorMessage) {
            m.channel.send(checkResult.errorMessage);
        } else {
            m.channel.send(await weatherController.searchWeatherData(args));
        }
    }
});

client.login(discordToken);
