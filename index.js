const express = require('express'); 
const app = express();
const port = 3000;

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://principal:principal@cluster.gmbyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let users = [];

async function run() {
  try {
	  
    const database = client.db("test");
    const usersCollection = database.collection("Users");
	
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
	

    // Find all documents in the Users collection
    users = await usersCollection.find().toArray();
	
	const newUser = { "name" : "guy" };
	
	const result = await usersCollection.insertOne(newUser);
	
	
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
 

// Liste d'utilisateurs (comme une base de données simulée)
 

// Endpoint GET - Récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  res.json(users);
});

// Endpoint GET - Récupérer un utilisateur par ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// Endpoint POST - Créer un nouvel utilisateur
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint PUT - Mettre à jour un utilisateur
app.put('/users/:id', (req, res) =>
{
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// Endpoint DELETE - Supprimer un utilisateur
app.delete('/users/:id', (req, res) =>
{
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.status(204).send();
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`API en cours d'exécution sur http://localhost:${port}`);
}); 
