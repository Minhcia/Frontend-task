import React, { useState, useCallback } from 'react';
import styles from './Header.module.scss';

type HeaderProps = {
  onSearch: (searchTerm: string) => void;
  onSort: (sortField: 'name' | 'email' | 'website', sortOrder: 'asc' | 'desc') => void;
};

const Header: React.FC<HeaderProps> = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState({
    field: 'name' as 'name' | 'email' | 'website',
    order: 'asc' as 'asc' | 'desc',
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'searchTerm') {
      setSearchTerm(value);
    } else if (name === 'sortField') {
      const sortField = value as 'name' | 'email' | 'website';
      setSort((prev) => ({ ...prev, field: sortField }));
      onSort(sortField, sort.order);
    }
  }, [onSort, sort.order]);

  const handleSearchClick = useCallback(() => {
    onSearch(searchTerm);
  }, [onSearch, searchTerm]);

  const handleSortOrderChange = useCallback(() => {
    const newSortOrder = sort.order === 'asc' ? 'desc' : 'asc';
    setSort((prev) => ({ ...prev, order: newSortOrder }));
    onSort(sort.field, newSortOrder);
  }, [onSort, sort]);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>User Dashboard</h1>
      <div className={styles.searchSort}>
        <input
          type="text"
          name="searchTerm"
          placeholder="Name, Email, Website..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearchClick} className={styles.searchButton}>Search</button>
        
        <div className={styles.sortContainer}>
          <label>Sort By:</label>
          <select 
            name="sortField" 
            className={styles.sortDropdown} 
            value={sort.field} 
            onChange={handleInputChange}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="website">Website</option>
          </select>
          <div className={styles.sortOrderContainer}>
            <label>
              <input 
                type="checkbox" 
                checked={sort.order === 'asc'} 
                onChange={handleSortOrderChange}
              />
              A-Z
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={sort.order === 'desc'} 
                onChange={handleSortOrderChange}
              />
              Z-A
            </label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
