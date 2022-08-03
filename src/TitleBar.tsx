import React from "react";
import { ethers } from "ethers";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ethService } from "./lib";

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
              <Button variant="primary" onClick={() => ethService.connectToWallet()}>
                Connect wallet
              </Button>
            </Col>
          </Row>
          <Row className={cardClasses}>
            <Col xs={12}>
              <Button variant="primary" onClick={() => ethService.signIn()}>
                Sign-in with Ethereum
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TitleBar;
