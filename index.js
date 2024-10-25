const express = require('express'); 
const app = express();
const port = 3000;
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const {ObjectId} = require('mongodb');


class UserModel{
	constructor(collection) {
		this.collection = collection;
	}
	
	async getAll () {
		return await this.collection.find({}).toArray();
	}
}


app.use(express.json());

const uri = "mongodb+srv://principal:principal@cluster.gmbyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 

async function run() {
  try {
	  
    await client.connect();
    const database = client.db("test");
    const usersCollection = database.collection("Users"); 	 
	
	const userModel = new UserModel(usersCollection);

	getAll = async(req,res) => { 
	try {
		const users = await userModel.getAll();
		res.json(users);
	  } catch (err) {
		res.status(500).json({ message: 'Erreur lors de la récupération des users' });
	  }
	};


	router.get('/users', getAll);
	app.use('/', router);
	
	app.listen(port, () => {
      console.log(`API en cours d'exécution sur http://localhost:${port}`);
    });
	
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
  }
}

run().catch(console.dir);



