const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('scissor app server is running smoothly 1')
})

// 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.esxyjse.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {

        await client.connect();
        const userCollection = client.db("scissorHand").collection("users");

        app.post('/adduser', async (req, res) => {
            const review = req.body;
            const result = await userCollection.insertOne(review);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`app running ${port}`)
})