const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'assignment5')
);

async function createRealisticConnections() {
    const session = driver.session();
  
    try {
      const result = await session.run('MATCH (u:User) RETURN ID(u) as id, u.hobbies as hobbies');
      const users = result.records.map(record => ({
        id: record.get('id'),
        hobbies: record.get('hobbies')
      }));
  
      console.log(`Fetched ${users.length} users`);
  
      const tx = session.beginTransaction();
      const maxConnectionsPerUser = 50;
  
      // Initialize counters for all users
      const userCounters = {};
      for (const user of users) {
        userCounters[user.id] = { LIKES: 0, DISLIKES: 0, total: 0 };
      }
  
      let generatedConnections = 0;
  
      // Iterate over users to create connections
      for (const userA of users) {
        // Skip if maximum number of connections for userA has been reached
        if (userCounters[userA.id].total >= maxConnectionsPerUser) {
          continue;
        }
  
        // Filter potential connection candidates based on common interests
        const potentialConnections = users.filter(userB =>
          userB.id !== userA.id && // Exclude userA itself
          userCounters[userB.id].total < maxConnectionsPerUser // Check maximum connections for userB
        );
  
        // Shuffle potential connection candidates to add randomness
        const shuffledCandidates = potentialConnections.sort(() => Math.random() - 0.5);
  
        // Create connections with shuffled candidates
        for (const userB of shuffledCandidates) {
          if (generatedConnections >= users.length * maxConnectionsPerUser) {
            break; // Stop if desired number of connections reached
          }
  
          console.log(`Creating connection between user ${userA.id} and user ${userB.id}`);
  
          // Create LIKE relationships between userA and userB
          const query = `
            MATCH (u1:User), (u2:User) 
            WHERE ID(u1) = $userA AND ID(u2) = $userB 
            CREATE (u1)-[:LIKES]->(u2), (u2)-[:LIKES]->(u1)
          `;
          await tx.run(query, { userA: userA.id, userB: userB.id });
  
          // Increment the counter for userA and userB
          userCounters[userA.id].LIKES++;
          userCounters[userB.id].LIKES++;
          userCounters[userA.id].total++;
          userCounters[userB.id].total++;
          generatedConnections++;
        }
      }
  
      // Small-world phenomenon: Add some random connections
      for (let i = 0; i <     users.length * maxConnectionsPerUser * 0.1; i++) { // Add 10% random connections
        const userA = users[Math.floor(Math.random() * users.length)];
        const userB = users[Math.floor(Math.random() * users.length)];
  
        // Skip if userA is the same as userB or maximum connections reached
        if (userA.id === userB.id ||
            userCounters[userA.id].total >= maxConnectionsPerUser ||
            userCounters[userB.id].total >= maxConnectionsPerUser) {
          continue;
        }
  
        console.log(`Creating random connection between user ${userA.id} and user ${userB.id}`);
  
        const query = `
          MATCH (u1:User), (u2:User) 
          WHERE ID(u1) = $userA AND ID(u2) = $userB 
          CREATE (u1)-[:LIKES]->(u2), (u2)-[:LIKES]->(u1)
        `;
        await tx.run(query, { userA: userA.id, userB: userB.id });
  
        // Increment the counter for userA and userB
        userCounters[userA.id].LIKES++;
        userCounters[userB.id].LIKES++;
        userCounters[userA.id].total++;
        userCounters[userB.id].total++;
        generatedConnections++;
      }
  
      await tx.commit();
      console.log('Realistic connections created successfully.');
    } catch (error) {
      console.error('Error creating realistic connections:', error);
    } finally {
      session.close();
      driver.close();
    }
  }
  
  createRealisticConnections();
  
  