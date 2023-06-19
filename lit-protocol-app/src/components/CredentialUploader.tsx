import React, { ChangeEvent, useState } from 'react';
import { lit } from '../lib/lit';
import { uploadToS3 } from '../lib/s3';
import { defaultContract } from '../lib/constants';

interface CredentialUploaderProps {
  s3DataKey: string;
}

const CredentialUploader: React.FC<CredentialUploaderProps> = ({
  s3DataKey,
}) => {
  const [jsonData, setJsonData] = useState<string>('');
  const [contractAddress, setContractAddress] =
    useState<string>(defaultContract);

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

  const handleUpload = async () => {
    try {
      const encryptedData = await lit.encryptText(jsonData, contractAddress);
      if (encryptedData) {
        await uploadToS3(s3DataKey, encryptedData);
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
        <textarea value={jsonData} onChange={handleJsonDataChange} />
      </div>
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
      <button onClick={handleUpload} disabled={!jsonData || !contractAddress}>
        Upload
      </button>
    </div>
  );
};

export default CredentialUploader;
