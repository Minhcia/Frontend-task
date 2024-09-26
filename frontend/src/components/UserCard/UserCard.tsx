import React, { useState } from 'react';
import styles from './UserCard.module.scss';
import UserDetailModal from '../UserDetailModal/UserDetailModal';

type UserProps = {
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
  avatar: string; // Add avatar feature for visualization
};

const UserCard: React.FC<UserProps> = ({ id, name, email, phone, website, address, avatar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.avatar}>
          <img src={avatar} alt={`${name}'s avatar`} />
        </div>
        <div className={styles.details}>
          <h3>{name}</h3>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>Website: <a href={`http://${website}`} target="_blank" rel="noreferrer">{website}</a></p>
          <p>Address: {address.street}, {address.suite}, {address.city}, {address.zipcode}</p>
        </div>
        <button className={styles.viewButton} onClick={handleViewClick}>View</button>
      </div>

      {isModalOpen && (
        <UserDetailModal 
          user={{ id, name, email, phone, website, address, avatar }}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default UserCard;
