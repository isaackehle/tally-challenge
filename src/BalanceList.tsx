import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Transaction from "./Transaction";
import TransactionTableHeader from "./TransactionTableHeader";
import { ethService } from "./lib";
import { BalanceRow } from "./types";

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

          {(() => {
            if (!this.state.balances.length) {
              return (
                <Row>
                  <Col>
                    <Transaction></Transaction>
                  </Col>
                </Row>
              );
            }
          })()}

          {this.state.balances.map((data: BalanceRow) => (
            <Row key={data.contractAddress}>
              <Col>
                <Transaction data={data} />
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    );
  }

  async fetchBalances() {
    // await ethService.getBlock();
    const tokenBalances = await ethService.getBalances();

    // Do a subset of the returned list for the demo.
    // Why is there not pagination in the balances function?
    const subset = tokenBalances.splice(0, 10);

    // I prefer to not use loops.  However, since this is spinning on awaits, and this is demo code, this is how it's being done.
    // Could do parallels, could do pagination.
    // This could also be in a helper function that gives a max of entries, if it was reusable.
    const balances: BalanceRow[] = [];
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
