import { ethers } from "ethers";

export class Web3 {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.providers.JsonRpcSigner | null = null;

  connect = async () => {
    if (this.signer) {
      return;
    }

    if (window.ethereum){
        this.provider = new ethers.providers.Web3Provider(window.ethereum)
        await this.provider.send('eth_requestAccounts',[])
        this.signer = this.provider.getSigner();
    } else {
      throw new Error("Metamask not installed");
    }
  };

  getSigner = async () => {
    if (!this.signer) {
      await this.connect();
    }
    return this.signer;
  };

  getProvider = async () => {
    if (!this.provider) {
      await this.connect();
    }
    return this.provider!;
  };
}
