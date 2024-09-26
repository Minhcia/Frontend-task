import React, { useState, useEffect, useMemo, useCallback } from 'react';
import UserCard from '../UserCard/UserCard';
import styles from './UserList.module.scss';
import { fetchUsers } from '../../requestMethod/userAPI';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  avatar: string;
};

type UserListProps = {
  searchTerm: string;
  sortField: 'name' | 'email' | 'website';
  sortOrder: 'asc' | 'desc';
};

const UserList: React.FC<UserListProps> = ({ searchTerm, sortField, sortOrder }) => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users only once when component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    getUsers();
  }, []);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    // Apply search filter
    let updatedUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.website.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sort order
    updatedUsers.sort((a, b) => {
      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();
      
      if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return updatedUsers;
  }, [searchTerm, sortField, sortOrder, users]);

  return (
    <div className={styles.userList}>
      {filteredUsers.map(user => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
};

export default UserList;
