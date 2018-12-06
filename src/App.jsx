import React, { Component } from 'react';
import NavBar from './components/NavBar'
import LoginPrompt from './components/LoginPrompt'
import UploadPrompt from './components/UploadPrompt'
import { CardColumns, CardImg, Card } from 'reactstrap'
import './App.css';
import SearchBar from './components/SearchBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      queryText: '',
      isLoginVisible: false,
      isUploadVisible: false,
    };
  }

  handleSearch = () => {
    //Update images
  }

  handleQueryChange = (e) => {
    this.setState({ queryText: e.target.value });
  }

  toggleLogin = () => {
    this.setState({ isLoginVisible: !this.state.isLoginVisible })
  }

  toggleUpload = () => {
    this.setState({ isUploadVisible: !this.state.isUploadVisible })
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <NavBar toggleLogin={this.toggleLogin}>
            <SearchBar
              queryText={this.state.queryText}
              handleQueryChange={this.handleQueryChange}
              handleSearch={this.handleSearch}
            />
          </NavBar>
          <CardColumns >
            {this.state.images.map(image =>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src="https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&h=350" alt="cat" />
              </Card>
            )}
          </CardColumns>
        </div>
        <LoginPrompt isOpen={this.state.isLoginVisible} toggle={this.toggleLogin} />
        <UploadPrompt isOpen={this.state.isUploadVisible} toggle={this.toggleUpload} />
      </React.Fragment>
    );
  }
}

export default App;
