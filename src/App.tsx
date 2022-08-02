import React from "react";

import "typeface-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TitleBar from "./TitleBar";
import SignMessageInput from "./SignMessageInput";
import { Container, Row, Col } from "react-bootstrap";
import BalanceList from "./BalanceList";

function App() {
  const cardClasses = ["mt-2"].join(" ");

  return (
    <div className="App">
      <header className="App-header">
        <Container fluid style={{ textAlign: "left" }}>
          <Row className={cardClasses}>
            <Col xs={12}>
              <TitleBar></TitleBar>
            </Col>
          </Row>
          <Row className={cardClasses}>
            <Col xs={12}>
              <SignMessageInput></SignMessageInput>
            </Col>
          </Row>
          <Row className={cardClasses}>
            <Col xs={12}>
              <BalanceList></BalanceList>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
