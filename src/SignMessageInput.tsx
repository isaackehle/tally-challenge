import React from "react";
import { ethers } from "ethers";
import { generateNonce, SiweMessage } from "siwe";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SignMessageInput extends React.Component {
  message = "";
  signature = "";

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = this.provider.getSigner();

  render() {
    const textInputClasses = ["mb-3"].join(" ");
    const buttonClasses = ["mb-3"].join(" ");
    const containerClasses = ["my-3"].join(" ");

    return (
      <div>
        <Container className={containerClasses}>
          <Row>
            <Col xs={12} sm={9}>
              <Form>
                <Form.Group className={textInputClasses} controlId="exampleForm.ControlInput1">
                  <Form.Control placeholder="It's the end of the world, and we know it." />
                </Form.Group>
                <Form.Group className={textInputClasses} controlId="exampleForm.ControlInput2">
                  <Form.Control placeholder="And I feel fine..." />
                </Form.Group>
                <Form.Group className={textInputClasses} controlId="exampleForm.ControlInput3">
                  <Form.Control placeholder="- REM" />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={12} sm={3}>
              <Button variant="primary" className={buttonClasses} onClick={() => this.signMessage()}>
                Sign Message
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  // async signMessage(address: string, statement: string) {
  //   const domain = window.location.host;
  //   const origin = window.location.origin;

  //   const nonce = generateNonce();

  //   const message = new SiweMessage({ domain, address, statement, uri: origin, version: "1", chainId: 1, nonce });
  //   return message.prepareMessage();
  // }

  // private async connectWallet() {
  //   console.log("this.provider:", this.provider);

  //   try {
  //     // const providers = ethers.getDefaultProvider();
  //     // console.log({ providers });

  //     const out = await this.provider.send("eth_requestAccounts", []);
  //     console.log({ out });

  //     const address = out[0];

  //     const name = await this.provider.lookupAddress(address);

  //     console.log(name);

  //     const balance = await this.provider.getBalance(address);

  //     // balance is a BigNumber (in wei); format is as a sting (in ether)
  //     var etherString = ethers.utils.formatEther(balance);
  //     console.log("Balance: " + etherString);

  //     const transactionCount = await this.provider.getTransactionCount(address);
  //     console.log("Total Transactions Ever Send: " + transactionCount);
  //   } catch (e) {
  //     console.log("user rejected request; e:", e);
  //   }
  // }

  async signMessage() {
    // this.message = await this.createSiweMessage(await this.signer.getAddress(), "Sign in with Ethereum to the app.");
    // this.signature = await this.signer.signMessage(this.message);
    // console.log({ message: this.message, signature: this.signature });
  }
}

export default SignMessageInput;
