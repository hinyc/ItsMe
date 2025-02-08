'use client';

import api from '@/common/api';

export default function CreateUserButton() {
  async function createUser() {
    // try {
    //   // const response = await fetch('/api/users', {
    //   //   method: 'POST'
    //   // });

    //   const response = await api.post('/users');
    //   if (!response) throw new Error('Failed to create user');
    //   const data = response;
    //   console.log('User created:', data);
    // } catch (error) {
    //   console.error('Error creating user:', error);
    // }

    console.log(await api.get('/user'));
  }

  return <button onClick={createUser}>Create User</button>;
}
