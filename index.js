const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('dating app server is running smoothly 1')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.esxyjse.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        app.get('/ami', async (req, res) => {
            res.send("ami")
        })
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = database.find(query);
            const users = await cursor.toArray();
            res.send("users")
        })
        await client.connect();
        const database = client.db("datingapp").collection("users");

        app.get('/tomi', (req, res) => {
            res.send("tomi")
        })
    }
    finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`app running ${port}`)
})