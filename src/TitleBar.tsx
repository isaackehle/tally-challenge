import React from "react";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
const BACKEND_ADDR = "http://localhost:3000";

class TitleBar extends React.Component {
  message = "";
  signature = "";

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = this.provider.getSigner();

  render() {
    return (
      <div>
        <button onClick={() => this.connectWallet()}>Connect wallet</button>
        <button onClick={() => this.signInWithEthereum()}>Sign-in with Ethereum</button>
        <button onClick={() => this.sendForVerification()}>Send for Verification</button>
      </div>
    );
  }

  async createSiweMessage(address: string, statement: string) {
    const domain = window.location.host;
    const origin = window.location.origin;

    const res = await fetch(`${BACKEND_ADDR}/nonce`);
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
      nonce: await res.text(),
    });
    return message.prepareMessage();
  }

  private connectWallet() {
    console.log("this.provider:", this.provider);
    this.provider.send("eth_requestAccounts", []).catch(() => console.log("user rejected request"));
  }

  async sendForVerification() {
    const res = await fetch(`${BACKEND_ADDR}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: this.message, signature: this.signature }),
    });
    console.log(await res.text());
  }

  async signInWithEthereum() {
    this.message = await this.createSiweMessage(await this.signer.getAddress(), "Sign in with Ethereum to the app.");
    console.log(this.message);
    this.signature = await this.signer.signMessage(this.message);
    console.log(this.signature);
  }
}

export default TitleBar;
