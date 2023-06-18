import React, { useState } from 'react';
import { downloadFromS3 } from '../lib/s3';
import { lit } from '../lib/lit';

interface CredentialDownloaderProps {
  s3DataKey: string;
}

const CredentialDownloader: React.FC<CredentialDownloaderProps> = ({
  s3DataKey,
}) => {
  const [decryptedText, setDecryptedText] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      const encryptedText = await downloadFromS3(s3DataKey);
      if (encryptedText) {
        const decrypted = await lit.decryptText(encryptedText);
        setDecryptedText(decrypted);
      }
    } catch (error) {
      console.error('Failed to download credential:', error);
    }
  };

  return (
    <div>
      <h2>Credential Downloader</h2>
      {decryptedText ? (
        <textarea value={decryptedText} readOnly />
      ) : (
        <button onClick={handleDownload}>Download</button>
      )}
    </div>
  );
};

export default CredentialDownloader;
