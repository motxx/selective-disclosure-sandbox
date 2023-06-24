// WalletContext.ts
import { createContext } from 'react';

const WalletContext = createContext<string | null>(null);

export default WalletContext;
