const express = require('express');
const app = express();
const db = require('./models/db');
const itemRoutes = require('./controllers/items');

app.use(express.json());
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 8080;

db.sync().then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Database sync failed:", err);
});