import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ethService } from "./lib";

class SignMessageInput extends React.Component {
  state = {
    messages: ["It's the end of the world, and we know it.", "And I feel fine...", "- REM"],
  };

  render() {
    const textInputClasses = ["mb-3"].join(" ");
    const buttonClasses = ["mb-3"].join(" ");
    const containerClasses = ["my-3"].join(" ");

    const updateText = (index: number, val: string) => {
      const messages = this.state.messages.slice();
      messages[index] = val;
      this.setState({ messages: messages });
    };

    return (
      <div>
        <Container className={containerClasses}>
          <Row>
            <Col xs={12} sm={9}>
              <Form>
                {this.state.messages.map((item, key) => (
                  <React.Fragment key={key}>
                    <Form.Group className={textInputClasses} controlId="input{key}">
                      <Form.Control value={item} onChange={(e: any) => updateText(key, e.target.value)} />
                    </Form.Group>
                  </React.Fragment>
                ))}
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
    const message = this.state.messages.join("\n");
    ethService.signMessage(message);
  }
}

export default SignMessageInput;
