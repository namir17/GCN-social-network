import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import Header from './Header';
import Card from './Card';
import Navigation from './Navigation';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const onLike = async (userId, likedUserId) => {
    try {
      await fetch(`/api/users/${userId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likedUserId })
      });

      setUsers(prevUsers => prevUsers.filter(user => user.id !== likedUserId));
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  const onDislike = async (userId, dislikedUserId) => {
    try {
      await fetch(`/api/users/${userId}/dislike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dislikedUserId })
      });

      setUsers(prevUsers => prevUsers.filter(user => user.id !== dislikedUserId));
    } catch (error) {
      console.error('Error adding dislike:', error);
    }
  };

  return (
    <Container>
      <Header />
      {users.map((user, index) => (
        <Box key={user.id} mb={2}>
          <Card
            name={user.name}
            age={user.age}
            imageUrl={user.imageUrl} // changed from user.image to user.imageUrl
            bio={user.bio}
          />
          <Navigation
            onLike={() => onLike(user.id, users[index+1]?.id)}
            onDislike={() => onDislike(user.id, users[index+1]?.id)}
          />
        </Box>
      ))}
    </Container>
  );
}

export default App;
