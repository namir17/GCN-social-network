const express = require('express');
const neo4j = require('neo4j-driver');

const app = express();
const port = 5003;

app.use(express.json()); // for parsing application/json

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'assignment5')
);

const session = driver.session();

// Check connection
session.run('RETURN 1')
  .then(() => console.log('Successfully connected to Neo4j'))
  .catch(error => console.error('Error connecting to Neo4j:', error));

app.get('/api/users', async (req, res) => {
  try {
    const result = await session.run('MATCH (u:User) RETURN u LIMIT 25');
    const users = result.records.map(record => record.get('u').properties);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

app.post('/api/users/:userId/like', async (req, res) => {
  const { userId } = req.params;
  const { likedUserId } = req.body;

  try {
    const result = await session.run(
      'MATCH (u1:User {id: $userId}), (u2:User {id: $likedUserId}) MERGE (u1)-[:LIKES]->(u2)',
      { userId, likedUserId }
    );

    res.json({ message: 'Like added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding like' });
  }
});

app.post('/api/users/:userId/dislike', async (req, res) => {
  const { userId } = req.params;
  const { dislikedUserId } = req.body;

  try {
    const result = await session.run(
      'MATCH (u1:User {id: $userId}), (u2:User {id: $dislikedUserId}) MERGE (u1)-[:DISLIKES]->(u2)',
      { userId, dislikedUserId }
    );

    res.json({ message: 'Dislike added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding dislike' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('exit', () => {
  session.close();
  driver.close();
});
