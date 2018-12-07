import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
import LoginPrompt from "./components/LoginPrompt";
import UploadPrompt from "./components/UploadPrompt";
import { CardColumns, CardImg, Card } from "reactstrap";
import "./App.css";
import SearchBar from "./components/SearchBox";
import UploadButton from "./components/UploadButton";
import { queryImage } from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      queryText: "",
      isLoginVisible: false,
      isUploadVisible: false,
      isLoading: false
    };
  }

  handleSearch = () => {
    const queryText = this.state.queryText;
    if (queryText.length > 0) {
      this.setState({ isLoading: true });
      queryImage(queryText)
        .then(res => {
          const urls = res.results.map(result => result.url);
          this.setState({ images: urls, isLoading: false });
        })
        .catch(e => alert("Invalid API Key"));
    }
  };

  handleQueryChange = e => {
    this.setState({ queryText: e.target.value });
  };

  toggleLogin = () => {
    this.setState({ isLoginVisible: !this.state.isLoginVisible });
  };

  toggleUpload = () => {
    this.setState({ isUploadVisible: !this.state.isUploadVisible });
  };

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
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <CardColumns>
              {this.state.images.map(image => (
                <Card key={image}>
                  <CardImg
                    top
                    width="100%"
                    src="https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&h=350"
                    alt="cat"
                  />
                </Card>
              ))}
            </CardColumns>
          )}
        </div>
        <UploadButton onClick={this.toggleUpload} />
        <LoginPrompt
          isOpen={this.state.isLoginVisible}
          toggle={this.toggleLogin}
        />
        <UploadPrompt
          isOpen={this.state.isUploadVisible}
          toggle={this.toggleUpload}
        />
      </React.Fragment>
    );
  }
}

export default App;
