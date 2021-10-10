import { REST } from '@discordjs/rest';
import dotenv from 'dotenv';
dotenv.config();

const discordToken = process.env.TOKEN;

if (!discordToken) {
    throw new Error('Discord Token is missing.');
}
const rest = new REST({ version: '9' }).setToken(discordToken);
console.log(rest);
