import React, { useContext } from 'react';
import WalletContext from '@/context/walletContext';
import CredentialDownloader from '@/components/CredentialDownloader';
import DisclosureSelector from '@/components/DisclosureSelector';

const Holder: React.FC = () => {
  const walletAddress = useContext(WalletContext);

  return (
    <div>
      <h1>Holder</h1>
      {walletAddress && <CredentialDownloader holderAddress={walletAddress} />}
      <DisclosureSelector />
    </div>
  );
};

export default Holder;
