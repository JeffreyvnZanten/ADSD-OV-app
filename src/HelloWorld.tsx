import React, { useState, ChangeEvent } from 'react';

function HelloWorld() {
  const [name, setName] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  return (
    <div style={{ backgroundColor: '#E0F7FA', minHeight: '100vh' }}>
      <h1>Hello, {name}!</h1> 
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter a name"
      />
    </div>
  );
};

export default HelloWorld;