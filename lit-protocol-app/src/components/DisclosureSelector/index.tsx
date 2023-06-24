// components/DisclosureSelector/index.tsx
import React, { useState } from 'react';

const DisclosureSelector: React.FC = () => {
  const [disclosure, setDisclosure] = useState({
    attribute1: false,
    attribute2: false,
    attribute3: false,
  });

  const [verifierAddress, setVerifierAddress] = useState('');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisclosure({
      ...disclosure,
      [event.target.name]: event.target.checked,
    });
  };

  const handleVerifierAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVerifierAddress(event.target.value);
  };

  const handleProveButtonClick = () => {
    // TODO: Implement actual proof generation
    console.log('Prove button clicked!');
  };

  return (
    <div>
      <h2>Disclosure Selection</h2>
      {Object.keys(disclosure).map((key) => (
        <div key={key}>
          <input
            type="checkbox"
            id={key}
            name={key}
            checked={disclosure[key as keyof typeof disclosure]}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={key}>{key}</label>
        </div>
      ))}
      <div>
        <label htmlFor="verifierAddress">Verifier Address:</label>
        <input
          type="text"
          id="verifierAddress"
          value={verifierAddress}
          onChange={handleVerifierAddressChange}
          placeholder="Enter Verifier Address"
        />
      </div>
      <button onClick={handleProveButtonClick}>Prove</button>
    </div>
  );
};

export default DisclosureSelector;
