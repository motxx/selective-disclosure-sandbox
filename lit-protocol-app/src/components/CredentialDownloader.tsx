import React, { useState } from 'react';
import { downloadFromS3 } from '../lib/s3';

interface CredentialDownloaderProps {
  s3DataKey: string;
}

const CredentialDownloader: React.FC<CredentialDownloaderProps> = ({
  s3DataKey,
}) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      const blob = await downloadFromS3(s3DataKey);
      if (blob) {
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
      }
    } catch (error) {
      console.error('Failed to download credential:', error);
    }
  };

  return (
    <div>
      <h2>Credential Downloader</h2>
      {downloadUrl ? (
        <a href={downloadUrl} download="credential.json">
          Download Credential
        </a>
      ) : (
        <button onClick={handleDownload}>Download</button>
      )}
    </div>
  );
};

export default CredentialDownloader;
