import React from "react";
import { ethers } from "ethers";
import { generateNonce, SiweMessage } from "siwe";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class TitleBar extends React.Component {
  message = "";
  signature = "";

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = this.provider.getSigner();

  render() {
    const cardClasses = ["mt-2"].join(" ");

    return (
      <div>
        <Container>
          <Row className={cardClasses}>
            <Col xs={12}>
              <Button variant="primary" onClick={() => this.connectWallet()}>
                Connect wallet
              </Button>
            </Col>
          </Row>
          <Row className={cardClasses}>
            <Col xs={12}>
              <Button variant="primary" onClick={() => this.signInWithEthereum()}>
                Sign-in with Ethereum
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  async createSiweMessage(address: string, statement: string) {
    const domain = window.location.host;
    const origin = window.location.origin;

    const nonce = generateNonce();

    const message = new SiweMessage({ domain, address, statement, uri: origin, version: "1", chainId: 1, nonce });
    return message.prepareMessage();
  }

  private async connectWallet() {
    console.log("this.provider:", this.provider);

    try {
      // const providers = ethers.getDefaultProvider();
      // console.log({ providers });

      const out = await this.provider.send("eth_requestAccounts", []);
      console.log({ out });

      const address = out[0];

      const name = await this.provider.lookupAddress(address);

      console.log(name);

      const balance = await this.provider.getBalance(address);

      // balance is a BigNumber (in wei); format is as a sting (in ether)
      var etherString = ethers.utils.formatEther(balance);
      console.log("Balance: " + etherString);

      const transactionCount = await this.provider.getTransactionCount(address);
      console.log("Total Transactions Ever Send: " + transactionCount);
    } catch (e) {
      console.log("user rejected request; e:", e);
    }
  }

  async signInWithEthereum() {
    this.message = await this.createSiweMessage(await this.signer.getAddress(), "Sign in with Ethereum to the app.");
    this.signature = await this.signer.signMessage(this.message);
    console.log({ message: this.message, signature: this.signature });
  }

  // async sendForVerification() {
  //   const res = await fetch(`${BACKEND_ADDR}/verify`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ message: this.message, signature: this.signature }),
  //   });
  //   console.log(await res.text());
  // }
}

export default TitleBar;
