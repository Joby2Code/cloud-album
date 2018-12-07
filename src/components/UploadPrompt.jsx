import React from "react";
import { uploadImage } from "../api";
import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
export default class LogoutPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
  }

  handleUpload = () => {
    const file = this.fileRef.current.files[0];
    if (file) {
      console.log(file)
      this.props.toggle();
      uploadImage(file).catch(() => {
        alert("Upload failed, API key might be invalid");
      });
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Upload Image</ModalHeader>
        <ModalBody>
          <p>Please upload an image</p>
          <Input
            type="file"
            accept="image/jpeg,image/png"
            innerRef={this.fileRef}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleUpload}>
            Upload
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
