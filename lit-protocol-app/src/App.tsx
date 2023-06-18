import React from 'react';
import CredentialUploader from './components/CredentialUploader';
import CredentialDownloader from './components/CredentialDownloader';

const App: React.FC = () => {
  const s3DataKey = 'credential.json';

  return (
    <div className="App">
      <h1>Verifiable Credentials Management</h1>
      <CredentialUploader s3DataKey={s3DataKey} />
      <CredentialDownloader s3DataKey={s3DataKey} />
    </div>
  );
};

export default App;
