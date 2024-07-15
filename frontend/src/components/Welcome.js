import React, { useEffect, useState } from 'react';

const Welcome = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default Welcome;
