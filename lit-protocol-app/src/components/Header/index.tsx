import React, { useEffect, useState } from 'react';
import { Web3 } from '@/lib/web3';

const Header: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const web3 = new Web3();
        const walletAddress = await web3.getAddress();
        setAddress(walletAddress);
      } catch (error) {
        console.error('Failed to fetch address:', error);
      }
    };

    fetchAddress();
  }, []);

  return (
    <header>
      <h1>Verifiable Credentials Management</h1>
      {address && <p>Logged in with: {address}</p>}
    </header>
  );
};

export default Header;
