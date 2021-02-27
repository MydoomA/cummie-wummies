module.exports = {
    run: async function () {
        const express = require('express');
        const app = express();
        const port = 3000;

        app.get('/', (req, res) => res.send('repl.it | Running SelfBot.'));
        app.listen(port, () => console.log(`\x1b[34mhttp://localhost:${port}\x1b[0m`));
    }
}
