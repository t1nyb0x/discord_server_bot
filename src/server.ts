import express from 'express';
const app = express();
require('./main');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
})