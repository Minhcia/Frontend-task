import { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import Toolbar from './components/Toolbar/Toolbar';
import UserList from './components/UserList/UserList';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'email' | 'website'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Memoize handler functions to prevent unnecessary re-renders
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleSort = useCallback((field: 'name' | 'email' | 'website', order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header onSearch={handleSearch} onSort={handleSort} />
        <Toolbar />
        <UserList searchTerm={searchTerm} sortField={sortField} sortOrder={sortOrder} />
      </div>
    </div>
  );
};

export default App;
