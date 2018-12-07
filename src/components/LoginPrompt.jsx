import React from "react";
import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { setApiKey } from "../api";

export default class LogoutPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiKeyText: "" };
  }

  handleApiKeyTextChange = e => {
    this.setState({ apiKeyText: e.target.value });
  };

  handleLogin = () => {
    const key = this.state.apiKeyText;
    if (key.length > 0) {
      setApiKey(key);
      this.props.toggle();
    }
  };

  render() {
    return (
      <Modal toggle={this.props.toggle} isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggle}>Log in</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={this.state.apiKeyText}
            onChange={this.handleApiKeyTextChange}
            placeholder="Enter API key"
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.props.toggle}>Close</Button>
          <Button color="primary" onClick={this.handleLogin}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
