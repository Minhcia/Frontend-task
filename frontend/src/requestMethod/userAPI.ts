export const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.map((user: any) => ({
      ...user,

      // Fake avatar
      avatar: `https://i.pravatar.cc/150?u=${user.id}` 
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
