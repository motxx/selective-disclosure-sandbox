import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WalletContext from '@/context/walletContext';
import { Web3 } from '@/lib/web3';
import Header from '@/components/Header';
import Issuer from '@/views/Issuer';
import Holder from '@/views/Holder';

const App: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const web3 = new Web3();
      const walletAddress = await web3.getAddress();
      setAddress(walletAddress);
    };

    fetchAddress();
  }, []);

  return (
    <WalletContext.Provider value={address}>
      <Router>
        <div className="App">
          <Header />
          <ul>
            <li>
              <Link to="/issuer">Issuer</Link>
            </li>
            <li>
              <Link to="/holder">Holder</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/issuer" element={<Issuer />} />
            <Route path="/holder" element={<Holder />} />
          </Routes>
        </div>
      </Router>
    </WalletContext.Provider>
  );
};

export default App;
