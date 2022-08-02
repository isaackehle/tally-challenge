import React from "react";
import { FaGlassCheers, FaHeart } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class Transaction extends React.Component {
  state = {
    icon: "heart",
    balance: 12.123,
    symbol: "RLC",
    name: "iExec RLC",
    contractAddress: "0x6074c5bb672230e8672085532f7e901544a7375",
  };

  // This of course could be its own library
  private getIcon() {
    switch (this.state.icon) {
      case "heart":
        return <FaHeart />;
      default:
        return <FaGlassCheers />;
    }
  }

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
          <Col xs={2}>{this.getIcon()}</Col>
          <Col xs={2}>{this.state.balance}</Col>
          <Col xs={2}>{this.state.symbol}</Col>
          <Col xs={2}>{this.state.name}</Col>
          <Col style={{ overflowX: "clip" }}>{this.state.contractAddress}</Col>
        </Row>
      </Card>
    );
  }
}

export default Transaction;
