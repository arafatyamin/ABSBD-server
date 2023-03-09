const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0lhbrs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() => {
    try{
        const productsCollection = client.db('ABSBD').collection('Products');      
        const categoriesCollection = client.db('ABSBD').collection('ProductsCategories');       
        const usersCollection = client.db('ABSBD').collection('users');
        const reviewsCollection = client.db('ABSBD').collection('reviews');
        

        // get all services to db
        app.get('/products', async(req, res) => {   
            const query = {}
            const products = await productsCollection.find(query).toArray();
            res.send(products)
        })
        // get all services to db
        app.get('/categories', async(req, res) => {   
            const query = {}
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories)
        })

    }
    finally{}
}
run().catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('ABSBD server is running')
})

app.listen(port, ()=> {
    console.log(`absbd server is running on port ${port}`)
})