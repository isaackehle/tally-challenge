import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Transaction from "./Transaction";
import TransactionTableHeader from "./TransactionTableHeader";
import { ethService } from "./lib";

interface Balance {
  logo: string | null;
  balance: string | null;
  symbol: string | null;
  name: string | null;
  contractAddress: string;
}

class BalanceList extends React.Component {
  state = {
    balances: [],
  };

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

          {this.state.balances.map((balance) => JSON.stringify(balance))}
        </Container>
      </div>
    );
  }

  async fetchBalances() {
    // await ethService.getBlock();
    const tokenBalances = await ethService.getBalances();

    // Do a subset of the returned list for the demo
    const subset = tokenBalances.splice(0, 10);

    // I prefer to not use loops.  However, since this is spinning on awaits, and this is demo code, this is how it's being done.
    // Could do parallels, could do pagination.
    // This could also be in a helper function that gives a max of entries, if it was reusable.
    const balances: Balance[] = [];
    for (const tb of subset) {
      const contractAddress = tb.contractAddress;
      const meta = await ethService.getTokenBalanceMeta(contractAddress);
      const { logo, name, symbol } = meta;

      balances.push({ logo, balance: tb.tokenBalance, symbol, name, contractAddress });
    }

    this.setState({ balances });
  }
}

export default BalanceList;
