import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ethers } from "ethers";
import { generateNonce, SiweMessage } from "siwe";

// TODO: Move to a secure location.
const API_URL = "https://eth-mainnet.alchemyapi.io/v2/_ArbR3W9Ttz3Cx1Ofa_vVhcIxzxbx7tC";
const PRIVATE_KEY = "_ArbR3W9Ttz3Cx1Ofa_vVhcIxzxbx7tC";

export { ethService };

class EthService {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = this.provider.getSigner();
  address = "";
  message = "";
  signature = "";
  web3 = createAlchemyWeb3(API_URL);

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

    console.log({ address: this.address });
  };

  signIn = async () => {
    this.message = await this.createSiweMessage(await this.signer.getAddress(), "Sign in with Ethereum to the app.");
    this.signature = await this.signer.signMessage(this.message);
    console.log({ message: this.message, address: this.address, signature: this.signature });
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

  getBlock = async () => {
    const blockNumber = await this.web3.eth.getBlockNumber();
    console.log("The latest block number is " + blockNumber);
  };

  getBalances = async () => {
    const result = await this.web3.alchemy.getTokenBalances(this.address);
    return result.tokenBalances;
  };

  getTokenBalanceMeta = async (addr: string) => {
    return await this.web3.alchemy.getTokenMetadata(addr);
  };
}

const ethService = new EthService();

// const name = await this.provider.lookupAddress(address);
// console.log(name);

// const balance = await this.provider.getBalance(address);

// balance is a BigNumber (in wei); format is as a sting (in ether)
// var etherString = ethers.utils.formatEther(balance);
// console.log("Balance: " + etherString);

// const transactionCount = await this.provider.getTransactionCount(address);
// console.log("Total Transactions Ever Send: " + transactionCount);
