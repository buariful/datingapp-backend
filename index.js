const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is running smoothly')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.esxyjse.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        app.get('/ami', async (req, res) => {
            res.send("ami")
        })
        await client.connect();
        const database = client.db("datingapp").collection("users");

        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = database.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })
    }
    finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`app running ${port}`)
})