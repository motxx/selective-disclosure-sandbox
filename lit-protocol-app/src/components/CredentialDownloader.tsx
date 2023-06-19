import React, { ChangeEvent, useState } from 'react';
import { downloadFromS3 } from '../lib/s3';
import { lit } from '../lib/lit';
import { defaultContract } from '../lib/constants';

interface CredentialDownloaderProps {
  s3DataKey: string;
}

const CredentialDownloader: React.FC<CredentialDownloaderProps> = ({
  s3DataKey,
}) => {
  const [decryptedText, setDecryptedText] = useState<string | null>(null);
  const [contractAddress, setContractAddress] =
    useState<string>(defaultContract);

  const handleContractAddressChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setContractAddress(value);
  };

  const handleDownload = async () => {
    try {
      const encryptedText = await downloadFromS3(s3DataKey);
      if (encryptedText) {
        const decrypted = await lit.decryptText(encryptedText, contractAddress);
        setDecryptedText(decrypted);
      }
    } catch (error) {
      console.error('Failed to download credential:', error);
    }
  };

  return (
    <div>
      <h2>Credential Downloader</h2>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="contractAddress">Contract Address:</label>
        <input
          id="contractAddress"
          type="text"
          value={contractAddress}
          onChange={handleContractAddressChange}
          placeholder="Enter Contract Address"
        />
      </div>
      <button onClick={handleDownload} disabled={!contractAddress}>
        Download
      </button>
      {decryptedText && (
        <div style={{ marginBottom: '10px' }}>
          <textarea value={decryptedText} readOnly />
        </div>
      )}
    </div>
  );
};

export default CredentialDownloader;
