import React from "react";
import { ethers } from "ethers";
import { FaGlassCheers } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class Transaction extends React.Component {
  message = "";
  signature = "";

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = this.provider.getSigner();

  icon = "heart";
  balance = 12.123;
  symbol = "RLC";
  name = "iExec RLC";
  contractAddress = "0x6074c5bb672230e8672085532f7e901544a7375";

  render() {
    const cardClasses = ["mt-2"].join(" ");

    const cardStyle = {
      color: "purple",
      borderColor: "purple",
      backgrondColor: "white",
      fontFamily: "Roboto",
      fontSize: "1.1rem",
    };

    return (
      <Card body style={cardStyle} className={cardClasses}>
        <Row style={{ textAlign: "center" }}>
          <Col xs={2}>
            <FaGlassCheers />
          </Col>
          <Col xs={2}>{this.balance}</Col>
          <Col xs={2}>{this.symbol}</Col>
          <Col xs={2}>{this.name}</Col>
          <Col style={{ overflowX: "clip" }}>{this.contractAddress}</Col>
        </Row>
      </Card>
    );
  }
}

export default Transaction;
