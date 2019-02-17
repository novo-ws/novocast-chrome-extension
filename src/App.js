import React, { Component } from 'react';
import Header from './components/Header';
import { Settings } from './components/settings';
import { Container } from 'reactstrap';
import TableClass from './components/table';

class App extends Component {
  state = {
    showSettings: false
  };
  showSettings() {
    this.setState({ showSettings: !this.state.showSettings });
  }
  render() {
    return (
      <div className="App">
        <Container>
          <Header show={this.showSettings.bind(this)} />
          <Settings show={this.state.showSettings} />
          <TableClass />
        </Container>
      </div>
    );
  }
}

export default App;
