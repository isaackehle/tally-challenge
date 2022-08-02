import React from "react";
import { ethers } from "ethers";
import { generateNonce, SiweMessage } from "siwe";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Transaction from "./Transaction";
import TransactionTableHeader from "./TransactionTableHeader";

class BalanceList extends React.Component {
  message = "";
  signature = "";

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = this.provider.getSigner();

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Button variant="primary" onClick={() => this.fetchBalances()}>
                Fetch Balances
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <TransactionTableHeader></TransactionTableHeader>
            </Col>
          </Row>

          <Row>
            <Col>
              <Transaction></Transaction>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  async fetchBalances() {
    // this.message = await this.createSiweMessage(await this.signer.getAddress(), "Sign in with Ethereum to the app.");
    // this.signature = await this.signer.signMessage(this.message);
    // console.log({ message: this.message, signature: this.signature });
  }
}

export default BalanceList;
