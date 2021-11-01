require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const port = 3001
const app = express();


// Connect to DB
mongoose.connect(process.env.DATABASE_URL,
    { useUnifiedTopology: true, useNewUrlParser: true }
)
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB."));

app.use(express.json());
app.use(cors());

const usersRouter = require('./routes/users')
app.use('/', usersRouter)

app.get('/', (req, res) => {res.send("OK")})
app.listen(port, () => {
    console.log('Server is running on port ' + port + '.')
})


