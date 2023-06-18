import React, { ChangeEvent, useState } from 'react';
import { lit } from '../lib/lit';
import { uploadToS3 } from '../lib/s3';

interface CredentialUploaderProps {
  s3DataKey: string;
}

const CredentialUploader: React.FC<CredentialUploaderProps> = ({
  s3DataKey,
}) => {
  const [jsonData, setJsonData] = useState<string>('');

  const handleJsonDataChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setJsonData(value);
  };

  const handleUpload = async () => {
    try {
      const encryptedData = await lit.encryptText(jsonData);
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
      <textarea value={jsonData} onChange={handleJsonDataChange} />
      <button onClick={handleUpload} disabled={!jsonData}>
        Upload
      </button>
    </div>
  );
};

export default CredentialUploader;
