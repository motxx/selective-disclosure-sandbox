import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

class Lit {
  public litNodeClient;

  constructor(options: any) {
    this.litNodeClient = new LitJsSdk.LitNodeClientNodeJs(options);
  }

  async connect() {
    try {
      await this.litNodeClient.connect();
    } catch (error) {
      console.error(`Failed to connect to Lit: ${error}`);
    }
  }
}

export default new Lit({ alertWhenUnauthorized: false });
