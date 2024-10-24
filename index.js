const express = require('express');
const app = express();
const port = 3000;

// Middleware pour traiter les requêtes JSON


// Liste d'utilisateurs (comme une base de données simulée)
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

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
