import React, { ChangeEvent, useState } from 'react';
import { lit } from '@/lib/lit';
import { uploadToS3 } from '@/lib/s3';
import { defaultContract } from '@/lib/constants';

const CredentialUploader: React.FC = () => {
  const [jsonData, setJsonData] = useState<string>('');
  const [contractAddress, setContractAddress] =
    useState<string>(defaultContract);
  const [holderAddress, setHolderAddress] = useState<string>('');
  const [credentialName, setCredentialName] = useState<string>('');

  const handleJsonDataChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setJsonData(value);
  };

  const handleContractAddressChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setContractAddress(value);
  };

  const handleHolderAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setHolderAddress(value);
  };

  // handler function for credentialName
  const handleCredentialNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCredentialName(value);
  };

  const handleUpload = async () => {
    try {
      const encryptedData = await lit.encryptText(jsonData, contractAddress);
      if (encryptedData) {
        await uploadToS3(holderAddress, credentialName, encryptedData);
        console.log('Credential uploaded successfully');
      }
    } catch (error) {
      console.error('Failed to upload credential:', error);
    }
  };

  return (
    <div>
      <h2>Credential Uploader</h2>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="contractAddress">SBT Contract Address:</label>
        <input
          id="contractAddress"
          type="text"
          value={contractAddress}
          onChange={handleContractAddressChange}
          placeholder="Enter SBT Contract Address"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="holderAddress">Holder Address:</label>
        <input
          id="holderAddress"
          type="text"
          value={holderAddress}
          onChange={handleHolderAddressChange}
          placeholder="Enter Holder Address"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="credentialName">Credential Name:</label>
        <input
          id="credentialName"
          type="text"
          value={credentialName}
          onChange={handleCredentialNameChange}
          placeholder="Enter Credential Name"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="credentialJsonLd">
          Credential JSON-LD:
          <br />
        </label>
        <textarea
          id="credentialJsonLd"
          value={jsonData}
          onChange={handleJsonDataChange}
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={
          !jsonData || !contractAddress || !holderAddress || !credentialName
        }
      >
        Upload
      </button>
    </div>
  );
};

export default CredentialUploader;
