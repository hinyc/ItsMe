'use client';

export default function CreateUserButton() {
  async function createUser() {
    try {
      const response = await fetch('/api/users', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to create user');
      const data = await response.json();
      console.log('User created:', data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  return <button onClick={createUser}>Create User</button>;
}
