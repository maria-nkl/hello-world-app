import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';

const UserProfile = () => {
  const { user, logout } = useAuth();

  // Защита от undefined
  if (!user) {
    console.error('User data is not available');
    return null; // или return <div>Пользователь не загружен</div>;
  }

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" id="dropdown-profile">
        {user.email || 'Пользователь'} {/* Fallback если email отсутствует */}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.ItemText className="small text-muted">
          {user.name && `Имя: ${user.name}`}
        </Dropdown.ItemText>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout}>Выйти</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

UserProfile.propTypes = {
  // Если user передается через пропсы, а не контекст
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string
  })
};

export default UserProfile;