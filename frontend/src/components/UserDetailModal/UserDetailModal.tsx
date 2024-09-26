import React, { useMemo } from 'react';
import styles from './UserDetailModal.module.scss';

type UserDetailModalProps = {
  user: {
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
  onClose: () => void;
};

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  // Memoized values for static content
  const avatarUrl = useMemo(() => user.avatar, [user.avatar]);
  const websiteUrl = useMemo(() => `http://${user.website}`, [user.website]);
  const userAddress = useMemo(
    () => `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
    [user.address]
  );

  // Exit Modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.avatar}>
          <img src={avatarUrl} alt={`${user.name}'s avatar`} />
        </div>
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> <a href={websiteUrl} target="_blank" rel="noreferrer">{user.website}</a></p>
        <p><strong>Address:</strong> {userAddress}</p>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserDetailModal;
