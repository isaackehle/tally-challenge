import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Transaction from "./Transaction";
import TransactionTableHeader from "./TransactionTableHeader";

class BalanceList extends React.Component {
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

  async fetchBalances() {}
}

export default BalanceList;
