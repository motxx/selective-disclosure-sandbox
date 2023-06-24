// Holder.tsx
import React, { useContext } from 'react';
import WalletContext from '@/context/walletContext';
import CredentialDownloader from '@/components/CredentialDownloader';

const Holder: React.FC = () => {
  const walletAddress = useContext(WalletContext);

  return (
    <div>
      <h1>Holder</h1>
      {walletAddress && <CredentialDownloader holderAddress={walletAddress} />}
    </div>
  );
};

export default Holder;
