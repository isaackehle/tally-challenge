import { ethers } from "ethers";
import { generateNonce, SiweMessage } from "siwe";

// TODO: Move to a secure location.
const API_URL = "https://eth-goerli.alchemyapi.io/v2/_ArbR3W9Ttz3Cx1Ofa_vVhcIxzxbx7tC";
const PRIVATE_KEY = "_ArbR3W9Ttz3Cx1Ofa_vVhcIxzxbx7tC";

export { ethService };

class EthService {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = this.provider.getSigner();
  address = "";
  message = "";
  signature = "";

  constructor() {
    console.log({ API_URL, PRIVATE_KEY });
  }

  createSiweMessage = async (address: string, statement: string) => {
    const domain = window.location.host;
    const origin = window.location.origin;
    const nonce = generateNonce();
    const message = new SiweMessage({ domain, address, statement, uri: origin, version: "1", chainId: 1, nonce });
    return message.prepareMessage();
  };

  requestAccounts = async () => {
    try {
      const out = await this.provider.send("eth_requestAccounts", []);
      console.log({ out });

      const address = out[0];
      return address;
    } catch (e) {
      console.log("user rejected request; e:", e);
    }
  };

  connectToWallet = async () => {
    console.log("provider:", this.provider);

    const address = await this.requestAccounts();
    this.address = address;

    // const name = await this.provider.lookupAddress(address);
    // console.log(name);

    // const balance = await this.provider.getBalance(address);

    // balance is a BigNumber (in wei); format is as a sting (in ether)
    // var etherString = ethers.utils.formatEther(balance);
    // console.log("Balance: " + etherString);

    // const transactionCount = await this.provider.getTransactionCount(address);
    // console.log("Total Transactions Ever Send: " + transactionCount);
  };

  signIn = async () => {
    this.message = await this.createSiweMessage(await this.signer.getAddress(), "Sign in with Ethereum to the app.");
    this.signature = await this.signer.signMessage(this.message);
    console.log({ message: this.message, signature: this.signature });
  };

  signMessage = async (statement: string) => {
    try {
      const signature = await this.signer.signMessage(statement);
      localStorage.setItem("signature", signature);
      console.log("signature: " + signature);
    } catch (e: any) {
      console.error(e);
    }
  };
}

const ethService = new EthService();
