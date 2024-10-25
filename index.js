const express = require('express'); 
const app = express();
const port = 3000; 

const { MongoClient, ServerApiVersion } = require('mongodb');
const userRoutes = require('./routes/userRoutes');
const userController = require('./controllers/userController'); 

const uri = "mongodb+srv://principal:principal@cluster.gmbyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 
app.use(express.json());

async function run() {
  try {
    // Connexion à la base de données
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("Users");

    userController.init(collection);
	
	app.use('/', userRoutes);
 
    // Middleware pour gérer les erreurs 500 (erreurs serveur)
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    });

    // Démarrer le serveur
    app.listen(port, () => {
      console.log(`API en cours d'exécution sur http://localhost:${port}`);
    });

  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);