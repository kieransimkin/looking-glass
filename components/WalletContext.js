import { createContext, useContext } from 'react';

const WalletContext = createContext(null); // Intentionally left empty
export default WalletContext;


export function useWalletContext() {
  return useContext(WalletContext);
}