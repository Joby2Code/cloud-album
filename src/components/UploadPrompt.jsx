import React from 'react';
import { Input, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default class LogoutPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef()
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Upload Image</ModalHeader>
        <ModalBody>
          <p>Please upload an image</p>
          <Input type="file" innerRef={this.fileRef} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.toggleModal} />
        </ModalFooter>
      </Modal>
    )
  }
}