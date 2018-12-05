import React from 'react'
import { Navbar, NavbarBrand, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const LoginButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>Login</Button>
  )
}

const LogoutButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>Logout</Button>
  )
}

const LogoutMoadl = ({ isVisible, toggle }) => {
  return (
    <Modal toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>User Accout </ModalHeader>
      <ModalBody>
        Do you want to log out?
          </ModalBody>
      <ModalFooter>
        <Button onClick={this.toggleModal} />
      </ModalFooter>
    </Modal>
  )
}



export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isLoggedIn: false,
    };
  }

  handleLogin = () => {

  }

  handleLogout = () => {

  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    return (
      <React.Fragment>
        <Navbar>
          <NavbarBrand>Album</NavbarBrand>
          {this.state.isLoggedIn ?
            <LogoutButton onClick={this.handleLogout} />
            :
            <LoginButton onClick={this.handleLogin} />
          }
        </Navbar>
      </React.Fragment>
    )
  }
}