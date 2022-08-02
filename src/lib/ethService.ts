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

    const name = await this.provider.lookupAddress(address);
    console.log(name);

    // const balance = await this.provider.getBalance(address);

    // balance is a BigNumber (in wei); format is as a sting (in ether)
    // var etherString = ethers.utils.formatEther(balance);
    // console.log("Balance: " + etherString);

    const transactionCount = await this.provider.getTransactionCount(address);
    console.log("Total Transactions Ever Send: " + transactionCount);
  };

  signIn = async () => {
    this.message = await this.createSiweMessage(await this.signer.getAddress(), "Sign in with Ethereum to the app.");
    this.signature = await this.signer.signMessage(this.message);
    console.log({ message: this.message, signature: this.signature });
  };

  signMessage = async (message: string) => {
    // this.message = await ethService.createSiweMessage(await this.signer.getAddress(), "Sign in with Ethereum to the app.");
    // this.signature = await this.signer.signMessage(this.message);
    // const message = "";
    // const walletInst = new ethers.Wallet(PRIVATE_KEY, ethersAlchemyProvider);
    // // Unlike Web3.js, Ethers seperates the provider instance and wallet instance, so we must also create a wallet instance
    // const signMessage = walletInst.signMessage(message);
    // // Using our wallet instance which holds our private key, we call the Ethers signMessage function and pass our message inside
    // const messageSigner = signMessage.then((value) => {
    //   // Because Ethers signMessage function returns a promise we use .then() to await the fulfilled promise
    //   const verifySigner = ethers.utils.recoverAddress(hashMessage(message), value);
    //   return verifySigner;
    //   // Now we verify the signature by calling the recoverAddress function which takes a message hash and signature hash and returns the signer address
    // });
    // const res = await fetch(`${BACKEND_ADDR}/verify`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message, signature: this.signature }),
    // });
    // console.log({ message: this.message, signature: this.signature });
  };
}

const ethService = new EthService();
