import express from 'express';
const app = express();
import { InteractionType, InteractionResponseType, verifyKeyMiddleware } from 'discord-interactions';
require('./main');

const PORT = process.env.PORT || 3000;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
})

if (PUBLIC_KEY) {
    app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async(req, res) => {
        const interaction = req.body;

        if (interaction.type === InteractionType.APPLICATION_COMMAND) {
            console.log(interaction.data.name);
            // if (interaction.data.name === 'yo') {
            //     return res.send({
            //         type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            //         data: {
            //             content: `Yo ${interaction.member.user.username}`,
            //         },
            //     });
            // }
        }
    });
}