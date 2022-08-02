import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ethService } from "./lib";

class SignMessageInput extends React.Component {
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

  async signMessage() {
    const message = "";
    ethService.signMessage(message);
  }
}

export default SignMessageInput;
