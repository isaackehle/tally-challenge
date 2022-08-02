import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class TransactionTableHeader extends React.Component {
  render() {
    const cardClasses = ["mt-2"].join(" ");

    const cardStyle = {
      color: "white",
      backgroundColor: "purple",
      fontFamily: "Roboto",
      fontSize: "1.1rem",
    };
    return (
      <Card body style={cardStyle} className={cardClasses}>
        {/* <Container> */}
        <Row style={{ textAlign: "center" }}>
          <Col xs={2}>Token icon</Col>
          <Col xs={2}>Current balance</Col>
          <Col xs={2}>Token symbol</Col>
          <Col xs={2}>Token name</Col>
          <Col>Contract address</Col>
        </Row>
        {/* </Container> */}
      </Card>
    );
  }
}

export default TransactionTableHeader;
