import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className="fab" onClick={() => navigate('/admin/upload')}>
      +
    </button>
  );
};

export default FloatingActionButton;
