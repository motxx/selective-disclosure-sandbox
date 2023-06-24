import { ethers } from 'ethers';

export class Web3 {
  private provider: ethers.JsonRpcApiProvider;

  constructor() {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      this.provider = new ethers.BrowserProvider((window as any).ethereum);
    } else {
      throw new Error('No Ethereum provider was found on window.');
    }
  }

  async getAddress(): Promise<string> {
    const signer = await this.provider.getSigner();
    const address = signer.address;
    return address;
  }
}
